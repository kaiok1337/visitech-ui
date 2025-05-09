'use client';

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
    <Flex gap={1} align="center">
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
            >
              {key}
            </Badge>
          );
        }
        // Handle regular keys
        return <Kbd key={index}>{key}</Kbd>;
      })}
    </Flex>
  );
};

const KeybindItem = ({ item, onHover }: { item: any, onHover: () => void }) => {
  return (
    <Flex 
      justify="space-between" 
      align="center" 
      py={2}
      px={1}
      _hover={{ bg: "gray.50", borderRadius: "md" }}
      onMouseEnter={onHover}
    >
      <Box w="120px">
        {renderKeybind(item.keybind)}
      </Box>
      <Text flex="1" ml={4}>{item.description}</Text>
    </Flex>
  );
};

export default function KeybindsMenu() {
  const [activeGif, setActiveGif] = useState<string | null>(null);
  const buttonBg = useColorModeValue('gray.200', 'gray.700');
  const popoverBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Simulating GIF selection based on keybind
  const getGifForKeybind = (keybind: string) => {
    // This would be replaced with actual mappings to GIFs
    return `/gifs/keybind-demo-placeholder.gif`;
  };

  const handleHover = (keybind: string) => {
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
        >
          Shortcuts
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent 
          width="700px" 
          maxWidth="90vw" 
          bg={popoverBg}
          border="1px solid"
          borderColor={borderColor}
          boxShadow="xl"
        >
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="bold" borderBottomWidth="1px">
            Keyboard Shortcuts & Mouse Controls
          </PopoverHeader>
          <PopoverBody p={0}>
            <Flex>
              {/* Left side: Categories and shortcuts */}
              <Box w="60%" p={4}>
                <Tabs variant="soft-rounded" colorScheme="blue" isLazy>
                  <TabList mb={4}>
                    <Tab><Icon as={FiNavigation} mr={2} /> Navigation</Tab>
                    <Tab><Icon as={FiMove} mr={2} /> Zoom</Tab>
                    <Tab><Icon as={FiCamera} mr={2} /> Tools</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel p={0}>
                      <Divider mb={2} />
                      {groupedKeybinds.navigation.map((item, index) => (
                        <React.Fragment key={index}>
                          <KeybindItem 
                            item={item} 
                            onHover={() => handleHover(item.keybind)} 
                          />
                          {index < groupedKeybinds.navigation.length - 1 && <Divider my={1} />}
                        </React.Fragment>
                      ))}
                    </TabPanel>
                    <TabPanel p={0}>
                      <Divider mb={2} />
                      {groupedKeybinds.zoom.map((item, index) => (
                        <React.Fragment key={index}>
                          <KeybindItem 
                            item={item} 
                            onHover={() => handleHover(item.keybind)} 
                          />
                          {index < groupedKeybinds.zoom.length - 1 && <Divider my={1} />}
                        </React.Fragment>
                      ))}
                    </TabPanel>
                    <TabPanel p={0}>
                      <Divider mb={2} />
                      {groupedKeybinds.tools.map((item, index) => (
                        <React.Fragment key={index}>
                          <KeybindItem 
                            item={item} 
                            onHover={() => handleHover(item.keybind)} 
                          />
                          {index < groupedKeybinds.tools.length - 1 && <Divider my={1} />}
                        </React.Fragment>
                      ))}
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              
              {/* Right side: GIF demonstration */}
              <Box w="40%" borderLeft="1px solid" borderColor={borderColor} p={4}>
                <Heading size="sm" mb={3}>Demonstration</Heading>
                <Box 
                  height="200px" 
                  bg="gray.100" 
                  borderRadius="md" 
                  display="flex" 
                  justifyContent="center" 
                  alignItems="center"
                  overflow="hidden"
                >
                  {activeGif ? (
                    <Image 
                      src={activeGif} 
                      alt="Keybind demonstration" 
                      objectFit="cover" 
                      width="100%"
                      fallback={
                        <Text color="gray.500" fontSize="sm">
                          Hover over a shortcut to see a demonstration
                        </Text>
                      }
                    />
                  ) : (
                    <Text color="gray.500" fontSize="sm">
                      Hover over a shortcut to see a demonstration
                    </Text>
                  )}
                </Box>
                <Text fontSize="xs" mt={2} color="gray.500" textAlign="center">
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