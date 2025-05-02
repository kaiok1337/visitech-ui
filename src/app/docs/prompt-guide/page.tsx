'use client';

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Stack,
  Divider,
  Code,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Center,
} from '@chakra-ui/react';

export default function PromptGuide() {
  const accentColor = useColorModeValue('brand.accent1', 'brand.accent1');
  const secondaryAccent = useColorModeValue('brand.accent2', 'brand.accent2');
  const placeholderBg = useColorModeValue('gray.100', 'gray.700');
  
  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Box>
          <Heading as="h1" size="xl" mb={4} color={accentColor}>
            Available Commands
          </Heading>
          <Text fontSize="lg" mb={6}>
            Below is a comprehensive list of commands you can use with our graph interface. 
            Each command has a description of what it does and a visual example of its output.
            For location-specific commands, replace [location] with your desired location (e.g., a state name like "Texas").
          </Text>
        </Box>

        <Divider />

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Command</Th>
                <Th>Description</Th>
                <Th>Example Output</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td><Code>What is the longest stretch of days over 90F in [location]?</Code></Td>
                <Td>Finds the longest consecutive period where the daily maximum temperature exceeded 90°F in the specified location.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>What is the longest stretch of days below 30F in [location]?</Code></Td>
                <Td>Finds the longest consecutive period where the daily maximum temperature was below 30°F in the specified location.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>What is the most days over 95F in [location] during a single year?</Code></Td>
                <Td>Finds the year with the highest count of days above 95°F in the specified location.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>What is the most days below 20F in [location] during a single year?</Code></Td>
                <Td>Finds the year with the highest count of days below 20°F in the specified location.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show all [location] daily maximum temperatures.</Code></Td>
                <Td>Displays all recorded daily maximum temperatures for the specified location.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show all [location] daily minimum temperatures.</Code></Td>
                <Td>Displays all recorded daily minimum temperatures for the specified location.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>List all days above 90 degrees in [location].</Code></Td>
                <Td>Lists all dates where the daily maximum temperature exceeded 90°F in the specified location.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>List all days below 32 degrees in [location].</Code></Td>
                <Td>Lists all dates where the daily maximum temperature was below 32°F in the specified location.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>List all days below minus four in [location].</Code></Td>
                <Td>Lists all dates where the daily maximum temperature was below -4°F in the specified location.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show all [location] temperatures.</Code></Td>
                <Td>Displays all available daily temperature data for the specified location.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show [location] drought.</Code></Td>
                <Td>Displays drought index data (PDSI) for the specified location.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show drought.</Code></Td>
                <Td>Displays drought index data (PDSI) for the United States.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show sunspots.</Code></Td>
                <Td>Displays historical sunspot count data.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show Arctic sea ice.</Code></Td>
                <Td>Displays Arctic sea ice extent or area data.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show Arctic sea ice OSI.</Code></Td>
                <Td>Displays Arctic sea ice data from the OSI (Ocean and Sea Ice) dataset.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show Arctic sea ice area.</Code></Td>
                <Td>Displays the area of Arctic sea ice.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show Arctic sea ice NSIDC.</Code></Td>
                <Td>Displays Arctic sea ice data from the NSIDC (National Snow and Ice Data Center) dataset.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show Antarctic sea ice.</Code></Td>
                <Td>Displays Antarctic sea ice extent or area data.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show Intel stock price.</Code></Td>
                <Td>Displays the current or historical stock price for Intel (INTC).</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show Nvidia stocks.</Code></Td>
                <Td>Displays the current or historical stock price for Nvidia (NVDA).</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Explain the graph.</Code></Td>
                <Td>Provides a description or interpretation of the currently displayed graph.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Plot by year.</Code></Td>
                <Td>Displays data as a yearly plot.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show percent gain.</Code></Td>
                <Td>Displays the percent gain of the dataset over the selected period.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Plot the last five years.</Code></Td>
                <Td>Displays data for the most recent five years.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Plot the last two months.</Code></Td>
                <Td>Displays data for the most recent two months.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Plot the last sixty days.</Code></Td>
                <Td>Displays data for the most recent sixty days.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Plot the last year.</Code></Td>
                <Td>Displays data for the most recent year.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show the last 120 years.</Code></Td>
                <Td>Displays data for the most recent 120 years.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show range 1957 to 1980.</Code></Td>
                <Td>Displays data from 1957 through 1980.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Plot range 1963 to 1984.</Code></Td>
                <Td>Displays data from 1963 through 1984.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Plot begin 1963.</Code></Td>
                <Td>Displays data starting from the year 1963.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Plot start 1990.</Code></Td>
                <Td>Displays data starting from the year 1990.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Plot end 2000.</Code></Td>
                <Td>Displays data up to the year 2000.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show full range.</Code></Td>
                <Td>Displays the entire available data range.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Center 32.</Code></Td>
                <Td>Centers the graph at the value 32.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Set point size to 1.5.</Code></Td>
                <Td>Sets the size of points on the graph to 1.5.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Set vertical lines to 14.</Code></Td>
                <Td>Displays 14 vertical grid lines on the graph.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Set horizontal lines to 15.</Code></Td>
                <Td>Displays 15 horizontal grid lines on the graph.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Set minimum to 12.</Code></Td>
                <Td>Sets the lower limit (minimum value) of the graph's Y-axis to 12.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Set Y maximum to 22 thousand.</Code></Td>
                <Td>Sets the upper limit (maximum value) of the graph's Y-axis to 22,000.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show annual growth.</Code></Td>
                <Td>Displays the annual growth rate of the data.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show difference.</Code></Td>
                <Td>Displays the difference between two data series.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show bar chart.</Code></Td>
                <Td>Displays the data as a bar chart.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show line graph.</Code></Td>
                <Td>Displays the data as a line graph.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show scatter plot.</Code></Td>
                <Td>Displays the data as a scatter plot.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Plot trend.</Code></Td>
                <Td>Displays a trend line on the graph.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Turn plot trend off.</Code></Td>
                <Td>Removes the trend line from the graph.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Reset zoom.</Code></Td>
                <Td>Resets the graph's zoom to the default view.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show moving average 365.</Code></Td>
                <Td>Displays a moving average with a 365-day window.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show mean 12.</Code></Td>
                <Td>Displays a moving average with a 12-point window.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show FFT.</Code></Td>
                <Td>Displays the fast Fourier transform (FFT) of the data.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Set chart title to [your title].</Code></Td>
                <Td>Sets the main title of the chart.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Set vertical title to [your title].</Code></Td>
                <Td>Sets the Y-axis (vertical) title of the chart.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Set horizontal title to [your title].</Code></Td>
                <Td>Sets the X-axis (horizontal) title of the chart.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Take screenshot.</Code></Td>
                <Td>Captures a screenshot of the current graph.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Select all.</Code></Td>
                <Td>Selects all data points or series in the graph.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show US population.</Code></Td>
                <Td>Displays US population data.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show map.</Code></Td>
                <Td>Displays a map relevant to the current data or context.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Compare maps.</Code></Td>
                <Td>Displays a comparison between different maps.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show CO2.</Code></Td>
                <Td>Displays atmospheric carbon dioxide (CO2) data.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show Briffa's reconstruction.</Code></Td>
                <Td>Displays Briffa's Northern Hemisphere climate reconstruction data.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show hurricanes.</Code></Td>
                <Td>Displays hurricane data.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show forest fires.</Code></Td>
                <Td>Displays data on forest fires.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show ENSO.</Code></Td>
                <Td>Displays El Niño–Southern Oscillation (ENSO) data.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show La Nina.</Code></Td>
                <Td>Displays La Niña event data.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show El Nino.</Code></Td>
                <Td>Displays El Niño event data.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show annual range.</Code></Td>
                <Td>Displays the range of values for each year.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show required range 1921 to 2021.</Code></Td>
                <Td>Displays data for the specified range of years (1921 to 2021).</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show annual count.</Code></Td>
                <Td>Displays the annual count of the relevant data points.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show annual records.</Code></Td>
                <Td>Displays annual record values for the dataset.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show daily total.</Code></Td>
                <Td>Displays the daily total or sum of the relevant data.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Show rank reverse.</Code></Td>
                <Td>Displays the data ranked in reverse order.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Rank series.</Code></Td>
                <Td>Ranks the data series by value.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
              <Tr>
                <Td><Code>Sort data.</Code></Td>
                <Td>Sorts the data in ascending or descending order.</Td>
                <Td>
                  <Center bg={placeholderBg} p={4} borderRadius="md" h="150px" w="200px">
                    <Text fontSize="sm" color="gray.500">GIF placeholder</Text>
                  </Center>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Container>
  );
}