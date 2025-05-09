"use client";

import React, { useState } from 'react';
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Text,
  Kbd,
  Badge,
  Image,
  useColorModeValue,
  Heading,
  Divider,
  SimpleGrid,
  Icon,
  Portal
} from '@chakra-ui/react';
import { 
  FiMousePointer, 
  FiMove, 
  FiNavigation, 
  FiCamera,
  FiDownload,
  FiKey
} from 'react-icons/fi';
import keybinds from '../lib/keybinds.json';

// Group keybinds by category
const groupedKeybinds = {
  navigation: keybinds.filter(kb => 
    kb.keybind.includes('arrow') || 
    kb.keybind.includes('Y') || 
    kb.keybind.includes('y') || 
    kb.keybind.includes('S') || 
    kb.keybind.includes('s')
  ),
  zoom: keybinds.filter(kb => 
    kb.keybind.includes('Scroll') || 
    kb.keybind.includes('drag') || 
    kb.keybind.includes('Ctrl+Shift+Z')
  ),
  tools: keybinds.filter(kb => 
    kb.keybind.includes('Ctrl+Shift') && 
    !kb.keybind.includes('Ctrl+Shift+Z') // excluding zoom reset
  )
};

// Function to render keybind in a nice format
const renderKeybind = (keyString: string) => {
  const keys = keyString.split('+').map((k: string) => k.trim());
  const mouseActions = ['Scroll wheel', 'Right click', 'Left click', 'and drag'];
  
  return (
    <Flex gap={1} align="center" flexWrap="wrap">
      {keys.map((key: string, index: number) => {
        // Handle mouse actions
        if (mouseActions.some(action => key.includes(action))) {
          return (
            <Badge 
              key={index} 
              colorScheme="blue" 
              fontSize="sm" 
              px={2} 
              py={1} 
              borderRadius="md"
              fontWeight="medium"
            >
              {key}
            </Badge>
          );
        }
        // Handle regular keys
        return (
          <Kbd 
            key={index} 
            px={2} 
            py={1} 
            fontWeight="semibold" 
            bgColor="gray.100" 
            boxShadow="md"
            borderRadius="md"
            _dark={{ bgColor: "gray.600" }}
          >
            {key}
          </Kbd>
        );
      })}
    </Flex>
  );
};

const KeybindItem = ({ item, onHover, isActive }: { item: any, onHover: () => void, isActive: boolean }) => {
  return (
    <Flex 
      justify="space-between" 
      align="center" 
      py={3}
      px={3}
      bg={isActive ? useColorModeValue("blue.50", "blue.900") : "transparent"}
      _hover={{ bg: useColorModeValue("gray.50", "gray.700"), borderRadius: "md" }}
      onMouseEnter={onHover}
      borderRadius="md"
      transition="all 0.2s ease"
    >
      <Box minW="130px" w="40%">
        {renderKeybind(item.keybind)}
      </Box>
      <Text flex="1" ml={4} fontSize="sm">{item.description}</Text>
    </Flex>
  );
};

export default function KeybindsMenu() {
  const [activeGif, setActiveGif] = useState<string | null>(null);
  const [hoveredKeybind, setHoveredKeybind] = useState<string | null>(null);
  const buttonBg = useColorModeValue('gray.200', 'gray.700');
  const popoverBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Get the actual image/gif for the keybind
  const getGifForKeybind = (keybind: string) => {
    const keybindItem = keybinds.find(kb => kb.keybind === keybind);
    // Make sure paths start with a slash if they don't already
    let picturePath = keybindItem?.picture || null;
    if (picturePath && !picturePath.startsWith('/')) {
      picturePath = '/' + picturePath;
    }
    return picturePath;
  };

  // Add debug info to check path construction
  const logImageLoad = (src: string, success: boolean) => {
    if (!success) {
      console.log(`Failed to load image: ${src}`);
    }
  };

  const handleHover = (keybind: string) => {
    setHoveredKeybind(keybind);
    setActiveGif(getGifForKeybind(keybind));
  };

  return (
    <Popover placement="bottom-start" closeOnBlur={true} isLazy>
      <PopoverTrigger>
        <Button
          leftIcon={<Icon as={FiKey} />}
          bg={buttonBg}
          _hover={{ bg: useColorModeValue('gray.300', 'gray.600') }}
          size="md"
          fontWeight="normal"
          transition="all 0.2s"
          _active={{ transform: "scale(0.98)" }}
        >
          Shortcuts
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent 
          width="900px" 
          maxWidth="95vw" 
          bg={popoverBg}
          border="1px solid"
          borderColor={borderColor}
          boxShadow="2xl"
          overflow="hidden"
        >
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="bold" borderBottomWidth="1px" py={3}>
            <Flex align="center">
              <Icon as={FiKey} mr={2} />
              <Text>Keyboard Shortcuts & Mouse Controls</Text>
            </Flex>
          </PopoverHeader>
          <PopoverBody p={0}>
            <Flex>
              {/* Left side: Categories and shortcuts */}
              <Box w="50%" p={4} borderRight="1px solid" borderColor={borderColor}>
                <Tabs variant="soft-rounded" colorScheme="blue" isLazy>
                  <TabList mb={4}>
                    <Tab><Icon as={FiNavigation} mr={2} /> Navigation</Tab>
                    <Tab><Icon as={FiMove} mr={2} /> Zoom</Tab>
                    <Tab><Icon as={FiCamera} mr={2} /> Tools</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel p={0}>
                      <Box 
                        maxH="400px" 
                        overflowY="auto" 
                        pr={2} 
                        css={{
                          '&::-webkit-scrollbar': {
                            width: '4px',
                          },
                          '&::-webkit-scrollbar-track': {
                            width: '6px',
                            background: useColorModeValue('gray.100', 'gray.800'),
                          },
                          '&::-webkit-scrollbar-thumb': {
                            background: useColorModeValue('gray.300', 'gray.600'),
                            borderRadius: '24px',
                          },
                        }}
                      >
                        {groupedKeybinds.navigation.map((item, index) => (
                          <KeybindItem 
                            key={index} 
                            item={item} 
                            onHover={() => handleHover(item.keybind)}
                            isActive={hoveredKeybind === item.keybind}
                          />
                        ))}
                      </Box>
                    </TabPanel>
                    <TabPanel p={0}>
                      <Box maxH="400px" overflowY="auto" pr={2}
                        css={{
                          '&::-webkit-scrollbar': {
                            width: '4px',
                          },
                          '&::-webkit-scrollbar-track': {
                            width: '6px',
                            background: useColorModeValue('gray.100', 'gray.800'),
                          },
                          '&::-webkit-scrollbar-thumb': {
                            background: useColorModeValue('gray.300', 'gray.600'),
                            borderRadius: '24px',
                          },
                        }}
                      >
                        {groupedKeybinds.zoom.map((item, index) => (
                          <KeybindItem 
                            key={index} 
                            item={item} 
                            onHover={() => handleHover(item.keybind)}
                            isActive={hoveredKeybind === item.keybind}
                          />
                        ))}
                      </Box>
                    </TabPanel>
                    <TabPanel p={0}>
                      <Box maxH="400px" overflowY="auto" pr={2}
                        css={{
                          '&::-webkit-scrollbar': {
                            width: '4px',
                          },
                          '&::-webkit-scrollbar-track': {
                            width: '6px',
                            background: useColorModeValue('gray.100', 'gray.800'),
                          },
                          '&::-webkit-scrollbar-thumb': {
                            background: useColorModeValue('gray.300', 'gray.600'),
                            borderRadius: '24px',
                          },
                        }}
                      >
                        {groupedKeybinds.tools.map((item, index) => (
                          <KeybindItem 
                            key={index} 
                            item={item} 
                            onHover={() => handleHover(item.keybind)}
                            isActive={hoveredKeybind === item.keybind}
                          />
                        ))}
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              
              {/* Right side: GIF demonstration */}
              <Box w="50%" p={5} bg={useColorModeValue("gray.50", "gray.800")}>
                <Heading size="sm" mb={3} fontWeight="medium">
                  <Flex align="center">
                    <Icon as={hoveredKeybind?.includes("Screenshot") ? FiCamera : FiMove} mr={2} />
                    Demonstration
                  </Flex>
                </Heading>
                <Box 
                  height="400px" 
                  bg={useColorModeValue("white", "gray.700")}
                  borderRadius="md" 
                  display="flex" 
                  flexDirection="column"
                  justifyContent="center" 
                  alignItems="center"
                  overflow="hidden"
                  boxShadow="sm"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  {activeGif ? (
                    <>
                      <Image 
                        src={activeGif} 
                        alt={`Demonstration for ${hoveredKeybind}`} 
                        objectFit="contain" 
                        height="90%"
                        width="100%"
                        onLoad={() => logImageLoad(activeGif!, true)}
                        onError={() => logImageLoad(activeGif!, false)}
                        fallback={
                          <Text color="gray.500" fontSize="sm">
                            No demonstration available for this shortcut
                          </Text>
                        }
                      />
                      <Text fontSize="xs" color="gray.600" mt={2} px={3} py={1}>
                        {hoveredKeybind} 
                      </Text>
                    </>
                  ) : (
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      height="100%"
                      gap={3}
                      p={4}
                    >
                      <Icon as={FiMousePointer} fontSize="4xl" color="gray.400" />
                      <Text color="gray.500" fontSize="sm" textAlign="center">
                        Hover over a shortcut to see a demonstration
                      </Text>
                    </Flex>
                  )}
                </Box>
                <Text fontSize="xs" mt={3} color="gray.500" textAlign="center">
                  This visual guide shows how to use the selected shortcut
                </Text>
              </Box>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}