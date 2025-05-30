'use client';

import {
  Box,
  Container,
  Heading,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaBook, FaCode, FaLightbulb } from 'react-icons/fa';

export default function Documentation() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const accentColor = useColorModeValue('brand.accent1', 'brand.accent1');
  
  return (
    <Box p={8} height="100%">
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
                <Heading size="lg" color={accentColor}>Getting Started</Heading>
              </Stack>
            </TabPanel>

            <TabPanel>
              <Stack spacing={6}>
                <Heading size="lg" color={accentColor}>API Reference</Heading>
              </Stack>
            </TabPanel>

            <TabPanel>
              <Stack spacing={6}>
                <Heading size="lg" color={accentColor}>Examples</Heading>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
} 