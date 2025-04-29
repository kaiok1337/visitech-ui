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
  OrderedList,
  UnorderedList,
  ListItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaThermometerHalf, FaChartLine, FaGlobeAmericas, FaLightbulb } from 'react-icons/fa';
import DocsLayout from '../layout';

export default function PromptGuide() {
  const accentColor = useColorModeValue('brand.accent1', 'brand.accent1');
  const secondaryAccent = useColorModeValue('brand.accent2', 'brand.accent2');
  const codeBg = useColorModeValue('gray.50', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Box>
          <Heading as="h1" size="xl" mb={4} color={accentColor}>
            Structured Prompt Design for Graph Interface
          </Heading>
          <Text fontSize="lg">
            This guide provides comprehensive instructions on structuring prompts for effective interaction 
            with the graphing web interface's chatbot. Learn how to craft queries that generate 
            accurate JSON outputs for data visualization and analysis.
          </Text>
        </Box>

        {/* New Quick Start Guide Section for Casual Users */}
        <Alert
          status="info"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          borderRadius="lg"
          p={6}
          bg={useColorModeValue('blue.50', 'blue.900')}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Quick Start: How to Ask Questions
          </AlertTitle>
          <AlertDescription maxWidth="4xl">
            <Text mb={4}>
              Just want to start using the chat interface? Here's how to structure your questions:
            </Text>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} my={6}>
              <Card bg={cardBg} shadow="md">
                <CardHeader>
                  <Flex align="center">
                    <Icon as={FaThermometerHalf} color={accentColor} boxSize={5} mr={2} />
                    <Heading size="sm">Ask about temperature data</Heading>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Text mb={2} fontWeight="bold">Try phrases like:</Text>
                  <UnorderedList spacing={2}>
                    <ListItem>"Show me days above 90°F in Texas"</ListItem>
                    <ListItem>"What's the longest stretch below freezing in Minnesota?"</ListItem>
                    <ListItem>"Most days over 100 degrees in Arizona"</ListItem>
                  </UnorderedList>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} shadow="md">
                <CardHeader>
                  <Flex align="center">
                    <Icon as={FaChartLine} color={accentColor} boxSize={5} mr={2} />
                    <Heading size="sm">Customize your graph</Heading>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Text mb={2} fontWeight="bold">Try phrases like:</Text>
                  <UnorderedList spacing={2}>
                    <ListItem>"Make this a bar chart"</ListItem>
                    <ListItem>"Show data from 1980 to 2020"</ListItem>
                    <ListItem>"Add horizontal lines to the graph"</ListItem>
                  </UnorderedList>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} shadow="md">
                <CardHeader>
                  <Flex align="center">
                    <Icon as={FaGlobeAmericas} color={accentColor} boxSize={5} mr={2} />
                    <Heading size="sm">Get global data</Heading>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Text mb={2} fontWeight="bold">Try phrases like:</Text>
                  <UnorderedList spacing={2}>
                    <ListItem>"Show Arctic sea ice data"</ListItem>
                    <ListItem>"Plot CO2 levels since 1950"</ListItem>
                    <ListItem>"Show NVDA stock price"</ListItem>
                  </UnorderedList>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} shadow="md">
                <CardHeader>
                  <Flex align="center">
                    <Icon as={FaLightbulb} color={accentColor} boxSize={5} mr={2} />
                    <Heading size="sm">Pro Tip: Combine Requests</Heading>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Text mb={2}>You can combine multiple instructions in one prompt:</Text>
                  <Text fontStyle="italic">
                    "Show California temperatures as a line graph from 1950-2000 with 10 horizontal lines"
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
            
            <Box bg={codeBg} p={4} borderRadius="md" textAlign="left">
              <Text fontWeight="bold" mb={2}>Quick Formula:</Text>
              <Text>
                <Code>[Location/Region]</Code> + <Code>[What you want to know]</Code> + <Code>[Parameters/Values]</Code>
              </Text>
              <Text fontSize="sm" mt={2} fontStyle="italic">
                Example: "Texas" + "longest stretch of days above" + "100°F"
              </Text>
            </Box>
          </AlertDescription>
        </Alert>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={4} color={accentColor}>
            Core Principles of Prompt Engineering
          </Heading>
          <Text mb={4}>
            The chatbot interprets user prompts by mapping them to a JSON schema containing three 
            mandatory fields: <Code>location</Code>, <Code>query</Code>, and <Code>target</Code>. 
            Success depends on adhering to the following principles:
          </Text>
          <UnorderedList spacing={2} pl={5}>
            <ListItem>
              <Text fontWeight="bold">Explicit Instruction:</Text> Directly reference supported query 
              types and locations (e.g., "longest_stretch_of_days_above" or "plot_type").
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">Schema Alignment:</Text> Structure requests to match the expected 
              JSON output format, even when using natural language.
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">Contextual Specificity:</Text> Include details like geographic regions, 
              measurement units, or time ranges to disambiguate requests.
            </ListItem>
          </UnorderedList>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={4} color={accentColor}>
            Components of a Valid Prompt
          </Heading>
          
          <Stack spacing={6}>
            <Box>
              <Heading as="h3" size="md" mb={3} color={secondaryAccent}>
                1. Specifying the Location
              </Heading>
              <Text mb={3}>
                The <Code>location</Code> field must be a geographic region or a predefined keyword.
              </Text>
              <Text fontWeight="bold" mb={2}>Supported Formats:</Text>
              <UnorderedList spacing={2} pl={5}>
                <ListItem>
                  <Text fontWeight="bold">Geographic:</Text> Use full names (e.g., "Texas") or abbreviations 
                  (e.g., "TX") of U.S. states. Global regions like "Arctic" or "Antarctic" are also valid.
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Special Keywords:</Text>
                  <UnorderedList spacing={1} pl={5}>
                    <ListItem><Code>Graph</Code>: For chart configuration (e.g., "plot_range" or "vertical_lines").</ListItem>
                    <ListItem><Code>Earth</Code>: For global datasets (e.g., "draw_map" or "carbon_dioxide").</ListItem>
                    <ListItem><Code>Stock</Code>: For financial data (e.g., "stock_price" with targets like "NVDA").</ListItem>
                  </UnorderedList>
                </ListItem>
              </UnorderedList>
              
              <Box bg={codeBg} p={4} borderRadius="md" my={4}>
                <Text fontWeight="bold" mb={2}>Examples:</Text>
                <Text><Code>"Plot annual temperatures in Texas"</Code> → <Code>"location": "Texas"</Code></Text>
                <Text><Code>"Add horizontal lines to the graph"</Code> → <Code>"location": "Graph"</Code></Text>
              </Box>
            </Box>
            
            <Box>
              <Heading as="h3" size="md" mb={3} color={secondaryAccent}>
                2. Selecting the Query Type
              </Heading>
              <Text mb={3}>
                The <Code>query</Code> field corresponds to one of the 51 predefined operations, categorized as follows:
              </Text>
              
              <Box mb={4}>
                <Heading as="h4" size="sm" mb={2}>A. Data Retrieval Queries</Heading>
                <Text fontWeight="bold">Temperature Analysis:</Text>
                <UnorderedList spacing={1} pl={5}>
                  <ListItem><Code>longest_stretch_of_days_above</Code>: Longest consecutive days exceeding a temperature threshold.</ListItem>
                  <ListItem><Code>most_days_below</Code>: Annual count of days below a specified temperature.</ListItem>
                </UnorderedList>
                
                <Text fontWeight="bold" mt={2}>Dataset Requests:</Text>
                <UnorderedList spacing={1} pl={5}>
                  <ListItem><Code>all_daily_maximum_temperatures</Code>: Retrieve all daily highs for a location.</ListItem>
                  <ListItem><Code>arctic_sea_ice</Code>: Fetch sea ice extent data.</ListItem>
                </UnorderedList>
              </Box>
              
              <Box mb={4}>
                <Heading as="h4" size="sm" mb={2}>B. Visualization Commands</Heading>
                <Text fontWeight="bold">Chart Configuration:</Text>
                <UnorderedList spacing={1} pl={5}>
                  <ListItem><Code>plot_type</Code>: Set the chart type (e.g., "bar_chart", "line_graph").</ListItem>
                  <ListItem><Code>plot_range</Code>: Define the time range (e.g., "1963-1984" or "5 years").</ListItem>
                </UnorderedList>
                
                <Text fontWeight="bold" mt={2}>Styling Adjustments:</Text>
                <UnorderedList spacing={1} pl={5}>
                  <ListItem><Code>point_size</Code>: Adjust marker size (e.g., "1.5").</ListItem>
                  <ListItem><Code>horizontal_lines</Code>: Add gridlines at specific intervals.</ListItem>
                </UnorderedList>
              </Box>
              
              <Box bg={codeBg} p={4} borderRadius="md">
                <Text fontWeight="bold" mb={2}>Examples:</Text>
                <Text><Code>"What is the longest stretch of days over 90°F in Illinois?"</Code> → <Code>"query": "longest_stretch_of_days_above"</Code></Text>
                <Text><Code>"Plot a line graph of CO2 levels from 1957 to 1980"</Code> → <Code>"query": "plot_type", "target": "line_graph"</Code></Text>
              </Box>
            </Box>
            
            <Box>
              <Heading as="h3" size="md" mb={3} color={secondaryAccent}>
                3. Defining the Target
              </Heading>
              <Text mb={3}>
                The <Code>target</Code> field provides context-specific parameters:
              </Text>
              <UnorderedList spacing={2} pl={5}>
                <ListItem>
                  <Text fontWeight="bold">Temperatures:</Text> Thresholds like "90F" or "-4".
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Chart Settings:</Text> Numerical values (e.g., "1.5" for point_size) 
                  or labels (e.g., "Degrees F" for vertical_title).
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Financial Instruments:</Text> Stock tickers like "INTC" or "NVDA".
                </ListItem>
              </UnorderedList>
              
              <Box bg={codeBg} p={4} borderRadius="md" my={4}>
                <Text fontWeight="bold" mb={2}>Examples:</Text>
                <Text><Code>"Show days below -10°C in Minnesota"</Code> → <Code>"target": "-10"</Code></Text>
                <Text><Code>"Plot Nvidia stock prices"</Code> → <Code>"target": "NVDA"</Code></Text>
              </Box>
            </Box>
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={4} color={accentColor}>
            Common Query Patterns and Examples
          </Heading>
          
          <Stack spacing={6}>
            <Box>
              <Heading as="h3" size="md" mb={3} color={secondaryAccent}>
                A. Temperature Analysis
              </Heading>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>User Prompt</Th>
                    <Th>JSON Output</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>"Most days over 95°F in Indiana"</Td>
                    <Td><Code>{"{ \"location\": \"Indiana\", \"query\": \"most_days_above\", \"target\": \"95F\" }"}</Code></Td>
                  </Tr>
                  <Tr>
                    <Td>"Longest stretch below 30°F in MN"</Td>
                    <Td><Code>{"{ \"location\": \"Minnesota\", \"query\": \"longest_stretch_of_days_below\", ... }"}</Code></Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
            
            <Box>
              <Heading as="h3" size="md" mb={3} color={secondaryAccent}>
                B. Chart Customization
              </Heading>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>User Prompt</Th>
                    <Th>JSON Output</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>"Plot last 120 years as a bar chart"</Td>
                    <Td><Code>{"{ \"location\": \"Graph\", \"query\": \"plot_type\", \"target\": \"bar_chart\" }"}</Code></Td>
                  </Tr>
                  <Tr>
                    <Td>"Add 15 horizontal gridlines"</Td>
                    <Td><Code>{"{ \"location\": \"Graph\", \"query\": \"horizontal_lines\", \"target\": \"15\" }"}</Code></Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
            
            <Box>
              <Heading as="h3" size="md" mb={3} color={secondaryAccent}>
                C. Global Datasets
              </Heading>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>User Prompt</Th>
                    <Th>JSON Output</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>"Show Arctic sea ice NSIDC data"</Td>
                    <Td><Code>{"{ \"location\": \"Arctic\", \"query\": \"arctic_sea_ice\", \"target\": \"NSIDC\" }"}</Code></Td>
                  </Tr>
                  <Tr>
                    <Td>"Plot CO2 levels since 1950"</Td>
                    <Td><Code>{"{ \"location\": \"Earth\", \"query\": \"carbon_dioxide\", \"target\": \"CO2\" }"}</Code></Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={4} color={accentColor}>
            Handling Special Cases and Advanced Usage
          </Heading>
          
          <Stack spacing={6}>
            <Box>
              <Heading as="h3" size="md" mb={3} color={secondaryAccent}>
                A. Unsupported Queries
              </Heading>
              <Text mb={3}>
                Queries outside valid_queries return:
              </Text>
              <Box bg={codeBg} p={4} borderRadius="md" mb={4}>
                <Code>{"{ \"location\": \"unrecognized\", \"query\": \"unrecognized\", \"target\": \"unrecognized\" }"}</Code>
              </Box>
              
              <Text fontWeight="bold" mb={2}>Mitigation Strategies:</Text>
              <UnorderedList spacing={2} pl={5}>
                <ListItem>Rephrase using supported keywords (e.g., replace "correlation" with two_series_difference).</ListItem>
                <ListItem>Simplify complex requests into discrete operations.</ListItem>
              </UnorderedList>
            </Box>
            
            <Box>
              <Heading as="h3" size="md" mb={3} color={secondaryAccent}>
                B. Multi-Parameter Prompts
              </Heading>
              <Text mb={3}>
                Combine plot_range, plot_type, and styling commands in a single request:
              </Text>
              <Box bg={codeBg} p={4} borderRadius="md" mb={4}>
                <Text mb={2}><Code>"Plot Texas temperatures from 1990–2020 as a line graph with 20 horizontal lines"</Code> →</Text>
                <Code px={4} display="block" whiteSpace="pre">
{`[
  { "location": "Texas", "query": "plot_range", "target": "1990-2020" },
  { "location": "Graph", "query": "plot_type", "target": "line_graph" },
  { "location": "Graph", "query": "horizontal_lines", "target": "20" }
]`}
                </Code>
              </Box>
            </Box>
            
            <Box>
              <Heading as="h3" size="md" mb={3} color={secondaryAccent}>
                C. Time Range Formats
              </Heading>
              <UnorderedList spacing={2} pl={5}>
                <ListItem><Text fontWeight="bold">Absolute:</Text> <Code>"1957–1980"</Code> → <Code>"target": "1957-1980"</Code></ListItem>
                <ListItem><Text fontWeight="bold">Relative:</Text> <Code>"Last 60 days"</Code> → <Code>"target": "60 days"</Code></ListItem>
              </UnorderedList>
            </Box>
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={4} color={accentColor}>
            Troubleshooting Common Issues
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Issue</Th>
                <Th>Solution</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Malformed JSON</Td>
                <Td>Use exact phrasing from examples (e.g., "plot_type" vs. "chart type").</Td>
              </Tr>
              <Tr>
                <Td>Unrecognized location</Td>
                <Td>Check spelling and use full state names (e.g., "California" vs. "CA").</Td>
              </Tr>
              <Tr>
                <Td>Invalid target for query</Td>
                <Td>Ensure targets match expectations (e.g., temperatures without units fail).</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Container>
  );
}