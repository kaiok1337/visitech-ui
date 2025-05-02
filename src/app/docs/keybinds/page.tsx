'use client';

import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Stack,
  Divider,
  useColorModeValue,
  Grid,
  GridItem,
  SimpleGrid,
  Badge,
  HStack,
  Kbd,
  Card,
  CardBody,
  Icon,
} from '@chakra-ui/react';
import { 
  FiMousePointer, 
  FiMove, 
  FiArrowLeft, 
  FiMaximize2, 
  FiNavigation, 
  FiCamera,
  FiDownload,
  FiInfo,
  FiHelpCircle
} from 'react-icons/fi';
import keybinds from '../../lib/keybinds.json';

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
    <HStack spacing={1} my={1}>
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
    </HStack>
  );
};

export default function KeybindsGuide() {
  const accentColor = useColorModeValue('brand.accent1', 'brand.accent1');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Box>
          <Heading as="h1" size="xl" mb={4} color={accentColor}>
            Keyboard Shortcuts & Mouse Controls
          </Heading>
          <Text fontSize="lg" mb={6}>
            Master the graph interface with these keyboard shortcuts and mouse controls. 
            Using these shortcuts will help you navigate, analyze, and manipulate data more efficiently.
          </Text>
        </Box>

        <Divider />

        {/* Quick Reference Section */}
        <Box>
          <Heading as="h2" size="lg" mb={4} color={accentColor}>
            Quick Reference
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <Card bg={cardBg} shadow="md" borderColor={borderColor} borderWidth="1px">
              <CardBody>
                <Flex align="center" mb={4}>
                  <Box
                    borderRadius="full"
                    bg="blue.100"
                    color="blue.500"
                    p={2}
                    mr={3}
                  >
                    <Icon as={FiMousePointer} boxSize={5} />
                  </Box>
                  <Heading size="md" fontWeight="bold">Most Used</Heading>
                </Flex>
                <Stack spacing={3}>
                  <Flex justify="space-between" align="center">
                    <Kbd>Scroll wheel</Kbd>
                    <Text>Zoom in/out</Text>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Kbd mr={2}>Left click + drag</Kbd>
                    <Text>Pan graph</Text>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>Z</Kbd>
                    <Text>Reset zoom</Text>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
            
            <Card bg={cardBg} shadow="md" borderColor={borderColor} borderWidth="1px">
              <CardBody>
                <Flex align="center" mb={4}>
                  <Box
                    borderRadius="full"
                    bg="green.100"
                    color="green.500"
                    p={2}
                    mr={3}
                  >
                    <Icon as={FiArrowLeft} boxSize={5} />
                  </Box>
                  <Heading size="md" fontWeight="bold">Navigation</Heading>
                </Flex>
                <Stack spacing={3}>
                  <Flex justify="space-between" align="center">
                    <HStack>
                      <Kbd>←</Kbd><Kbd>→</Kbd><Kbd>↑</Kbd><Kbd>↓</Kbd>
                    </HStack>
                    <Text>Move view</Text>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Kbd>Y</Kbd> / <Kbd>y</Kbd>
                    <Text>Previous/next year</Text>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Kbd>S</Kbd> / <Kbd>s</Kbd>
                    <Text>Previous/next screen</Text>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
            
            <Card bg={cardBg} shadow="md" borderColor={borderColor} borderWidth="1px">
              <CardBody>
                <Flex align="center" mb={4}>
                  <Box
                    borderRadius="full"
                    bg="purple.100"
                    color="purple.500"
                    p={2}
                    mr={3}
                  >
                    <Icon as={FiCamera} boxSize={5} />
                  </Box>
                  <Heading size="md" fontWeight="bold">Tools</Heading>
                </Flex>
                <Stack spacing={3}>
                  <Flex justify="space-between" align="center">
                    <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>X</Kbd>
                    <Text>Screenshot</Text>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>G</Kbd>
                    <Text>Generate CSV</Text>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>H</Kbd>
                    <Text>Help docs</Text>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Box>

        <Divider />

        {/* Detailed Section */}
        <Box>
          <Heading as="h2" size="lg" mb={6} color={accentColor}>
            Detailed Keyboard & Mouse Controls
          </Heading>
          
          <Stack spacing={8}>
            {/* Navigation Controls */}
            <Box>
              <Flex align="center" mb={4}>
                <Box
                  borderRadius="full"
                  bg="green.100"
                  color="green.500"
                  p={2}
                  mr={3}
                  display="inline-flex"
                >
                  <Icon as={FiNavigation} boxSize={5} />
                </Box>
                <Heading as="h3" size="md" color="green.500">
                  Navigation Controls
                </Heading>
              </Flex>
              
              <Grid 
                templateColumns={{ base: "1fr", md: "150px 1fr" }} 
                gap={4}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                borderColor={borderColor}
              >
                {groupedKeybinds.navigation.map((item, index) => (
                  <React.Fragment key={index}>
                    <GridItem fontWeight="semibold">
                      {renderKeybind(item.keybind)}
                    </GridItem>
                    <GridItem>
                      <Text>{item.description}</Text>
                    </GridItem>
                    {index < groupedKeybinds.navigation.length - 1 && (
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <Divider my={2} />
                      </GridItem>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
            
            {/* Zoom Controls */}
            <Box>
              <Flex align="center" mb={4}>
                <Box
                  borderRadius="full"
                  bg="blue.100"
                  color="blue.500"
                  p={2}
                  mr={3}
                  display="inline-flex"
                >
                  <Icon as={FiMaximize2} boxSize={5} />
                </Box>
                <Heading as="h3" size="md" color="blue.500">
                  Zoom & View Controls
                </Heading>
              </Flex>
              
              <Grid 
                templateColumns={{ base: "1fr", md: "150px 1fr" }} 
                gap={4}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                borderColor={borderColor}
              >
                {groupedKeybinds.zoom.map((item, index) => (
                  <React.Fragment key={index}>
                    <GridItem fontWeight="semibold">
                      {renderKeybind(item.keybind)}
                    </GridItem>
                    <GridItem>
                      <Text>{item.description}</Text>
                    </GridItem>
                    {index < groupedKeybinds.zoom.length - 1 && (
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <Divider my={2} />
                      </GridItem>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
            
            {/* Tool Controls */}
            <Box>
              <Flex align="center" mb={4}>
                <Box
                  borderRadius="full"
                  bg="purple.100"
                  color="purple.500"
                  p={2}
                  mr={3}
                  display="inline-flex"
                >
                  <Icon as={FiDownload} boxSize={5} />
                </Box>
                <Heading as="h3" size="md" color="purple.500">
                  Tools & Utilities
                </Heading>
              </Flex>
              
              <Grid 
                templateColumns={{ base: "1fr", md: "150px 1fr" }} 
                gap={4}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                borderColor={borderColor}
              >
                {groupedKeybinds.tools.map((item, index) => (
                  <React.Fragment key={index}>
                    <GridItem fontWeight="semibold">
                      {renderKeybind(item.keybind)}
                    </GridItem>
                    <GridItem>
                      <Text>{item.description}</Text>
                    </GridItem>
                    {index < groupedKeybinds.tools.length - 1 && (
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <Divider my={2} />
                      </GridItem>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Box>

        {/* Tips & Tricks */}
        <Box 
          mt={8} 
          p={6} 
          borderRadius="lg" 
          bg={useColorModeValue('blue.50', 'blue.900')}
          borderLeft="4px solid"
          borderColor="blue.500"
        >
          <Flex align="center" mb={3}>
            <Icon as={FiHelpCircle} color="blue.500" boxSize={5} mr={2} />
            <Heading as="h3" size="md">Pro Tips</Heading>
          </Flex>
          <Stack spacing={3}>
            <Text>• Combine keyboard shortcuts with mouse actions for faster navigation. For example, hold <Kbd>Shift</Kbd>+<Kbd>H</Kbd> while scrolling to zoom horizontally.</Text>
            <Text>• Use <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>X</Kbd> to quickly take a screenshot when you find interesting patterns in your data.</Text>
            <Text>• The <Kbd>Shift</Kbd>+<Kbd>Y</Kbd> and <Kbd>y</Kbd> keys are useful for examining year-over-year changes in time series data.</Text>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
} 