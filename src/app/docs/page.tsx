'use client';

import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaBook, FaCode, FaHome, FaLightbulb, FaMoon, FaSun, FaCheckCircle } from 'react-icons/fa';

export default function Documentation() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const accentColor = useColorModeValue('brand.accent1', 'brand.accent1');
  const secondaryAccent = useColorModeValue('brand.accent2', 'brand.accent2');
  
  return (
    <Box minH="100vh" bg={useColorModeValue('brand.lightBg', 'brand.darkBg')}>
      <Container maxW="container.xl" pt={8}>
        <Flex mb={8} justifyContent="space-between" alignItems="center">
          <Heading color={accentColor}>Documentation</Heading>
          <Stack direction="row" spacing={4}>
            <Button 
              as={NextLink}
              href="/"
              leftIcon={<FaHome />}
              variant="outline"
              borderColor={accentColor}
              color={accentColor}
            >
              Home
            </Button>
            <Button 
              as={NextLink}
              href="/login"
              variant="solid"
              bg={accentColor}
              color="white"
              _hover={{ bg: 'blue.500' }}
            >
              Login
            </Button>
            <Button 
              onClick={toggleColorMode} 
              variant="ghost"
              leftIcon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            >
              {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
          </Stack>
        </Flex>
        
        <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
          <Tabs colorScheme="blue" variant="enclosed">
            <TabList>
              <Tab><Box mr={2}><FaBook /></Box> Getting Started</Tab>
              <Tab><Box mr={2}><FaCode /></Box> API Reference</Tab>
              <Tab><Box mr={2}><FaLightbulb /></Box> Examples</Tab>
            </TabList>
            
            <TabPanels>
              
              <TabPanel>
                <Stack spacing={6}>
                  <Heading size="lg" color={accentColor}>API Reference</Heading>
                  <Text>
                    Explore our API documentation to integrate our services with your applications.
                  </Text>
                  
                  <Divider />
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                    <Box bg="gray.50" p={4} borderRadius="md" boxShadow="sm">
                      <Heading size="sm" color={secondaryAccent} mb={2}>Authentication</Heading>
                      <Text>Learn how to authenticate requests to our API</Text>
                    </Box>
                    
                    <Box bg="gray.50" p={4} borderRadius="md" boxShadow="sm">
                      <Heading size="sm" color={secondaryAccent} mb={2}>Endpoints</Heading>
                      <Text>Explore all available API endpoints</Text>
                    </Box>
                    
                    <Box bg="gray.50" p={4} borderRadius="md" boxShadow="sm">
                      <Heading size="sm" color={secondaryAccent} mb={2}>Error Handling</Heading>
                      <Text>Understand error codes and troubleshooting</Text>
                    </Box>
                    
                    <Box bg="gray.50" p={4} borderRadius="md" boxShadow="sm">
                      <Heading size="sm" color={secondaryAccent} mb={2}>Rate Limits</Heading>
                      <Text>Information about API rate limits and quotas</Text>
                    </Box>
                  </SimpleGrid>
                </Stack>
              </TabPanel>
              
              <TabPanel>
                <Stack spacing={6}>
                  <Heading size="lg" color={accentColor}>Examples</Heading>
                  <Text>
                    Practical examples to help you get started quickly with our platform.
                  </Text>
                  
                  <Box>
                    <Heading size="md" mb={4} color={secondaryAccent}>Basic Implementation</Heading>
                    <Box bg="gray.50" p={4} borderRadius="md" fontFamily="mono">
                      <Text color="gray.800">
                        
                      </Text>
                    </Box>
                  </Box>
                  
                  <Box>
                    <Heading size="md" mb={4} color={secondaryAccent}>Advanced Usage</Heading>
                    <Box bg="gray.50" p={4} borderRadius="md" fontFamily="mono">
                      <Text color="gray.800">
                        
                      </Text>
                    </Box>
                  </Box>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
} 