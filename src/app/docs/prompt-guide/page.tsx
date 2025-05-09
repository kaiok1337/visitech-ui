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
  Center,
  VStack,
  HStack,
  Collapse,
  useDisclosure,
  Badge,
} from '@chakra-ui/react';
import { useState } from 'react';

const DEBUG_IMAGES = true; // Set to false when not debugging

// Command component that shows description and GIF on hover
const CommandItem = ({ command, description, picture }: { command: string; description: string; picture?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const placeholderBg = useColorModeValue('gray.100', 'gray.700');
  const [boxRef, setBoxRef] = useState<HTMLDivElement | null>(null);
  
  // Calculate position to keep GIF anchored to command but visible
  const getGifPosition = () => {
    if (!boxRef) return { top: 0, right: 0 };
    
    const rect = boxRef.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Horizontal positioning - prefer right side but switch to left if needed
    const rightSpace = viewportWidth - rect.right;
    const useRightSide = rightSpace > 500; // GIF width + padding
    
    // Vertical positioning - center with command but ensure it stays in viewport
    let top = rect.top + (rect.height / 2) - 150; // 150 is half the GIF height
    top = Math.max(20, Math.min(viewportHeight - 320, top)); // Keep in viewport
    
    return {
      top: `${top}px`,
      ...(useRightSide 
        ? { left: `${rect.right + 10}px` } 
        : { right: `${viewportWidth - rect.left + 10}px` })
    };
  };

  // Ensure image path starts with a slash to reference from the public directory
  const getImagePath = (path?: string) => {
    if (!path) return null;
    return path.startsWith('/') ? path : `/${path}`;
  };
  
  return (
    <Box 
      ref={setBoxRef}
      borderBottom="1px" 
      borderColor="gray.200" 
      py={2}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      position="relative"
      transition="all 0.2s"
      _hover={{ bg: 'gray.50' }}
    >
      <HStack align="start" spacing={4}>
        <Code p={2} borderRadius="md" fontSize="sm" minW="250px" fontWeight="medium">
          {command}
        </Code>
        <Text fontSize="sm" flex="1">
          {description}
        </Text>
      </HStack>
      
      {/* GIF placeholder anchored to command but positioned to stay visible */}
      {isHovered && picture && (
        <Box 
          position="fixed" 
          zIndex="2000" 
          p={3} 
          shadow="xl" 
          bg="white" 
          borderRadius="md"
          borderWidth="2px"
          borderColor="gray.200"
          {...getGifPosition()}
        >
          <Center bg={placeholderBg} p={4} borderRadius="md" h="300px" w="650px">
            <img src={getImagePath(picture)} alt={`Demonstration of: ${command}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </Center>
        </Box>
      )}

      {isHovered && picture && DEBUG_IMAGES && (
        <Box position="absolute" bottom="-20px" left="0" fontSize="xs" color="red.500" zIndex="2100">
          Image path: {getImagePath(picture)}
        </Box>
      )}
    </Box>
  );
};

// Category component to group related commands
const CommandCategory = ({ title, commands }: { title: string; commands: {command: string; description: string; picture?: string}[]; }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  
  return (
    <Box mb={6}>
      <Box py={2} px={4} bg={bgColor} borderRadius="md" mb={2}>
        <Heading size="md">{title}</Heading>
      </Box>
      <VStack 
        spacing={0} 
        align="stretch" 
        divider={<Divider />} 
        borderWidth="1px"
        borderRadius="md"
        overflow="hidden"
      >
        {commands.map((cmd, idx) => (
          <CommandItem 
            key={idx} 
            command={cmd.command} 
            description={cmd.description} 
            picture={cmd.picture}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default function PromptGuide() {
  const accentColor = useColorModeValue('brand.accent1', 'brand.accent1');
  const secondaryAccent = useColorModeValue('brand.accent2', 'brand.accent2');
  
  // Command data organized by categories
  const commandCategories = [
    {
      title: "Weather & Temperature Commands",
      commands: [
        {
          command: "What is the longest stretch of days over 90F in [location]?",
          description: "Finds the longest consecutive period where the daily maximum temperature exceeded 90°F in the specified location.",
          picture: "/strech-above-90.png",
        },
        {
          command: "What is the longest stretch of days below 30F in [location]?",
          description: "Finds the longest consecutive period where the daily maximum temperature was below 30°F in the specified location.",
          picture: "/strech-below-30.png",
        },
        {
          command: "What is the most days over 95F in [location] during a single year?",
          description: "Finds the year with the highest count of days above 95°F in the specified location.",
          picture: "/strech-above-95.png",
        },
        {
          command: "What is the most days below 20F in [location] during a single year?",
          description: "Finds the year with the highest count of days below 20°F in the specified location.",
          picture: "/days-below-20.png",
        },
        {
          command: "Show all [location] daily maximum temperatures.",
          description: "Displays all recorded daily maximum temperatures for the specified location.",
          picture: "/daily-maximum.png",
        },
        {
          command: "Show all [location] daily minimum temperatures.",
          description: "Displays all recorded daily minimum temperatures for the specified location.",
          picture: "/daily-minimum.png",
        },
        {
          command: "List all days above 90 degrees in [location].",
          description: "Lists all dates where the daily maximum temperature exceeded 90°F in the specified location.",
          picture: "/strech-above-90.png",
        },
        {
          command: "List all days below 32 degrees in [location].",
          description: "Lists all dates where the daily maximum temperature was below 32°F in the specified location.",
          picture: "/strech-below-30.png",
        },
        {
          command: "List all days below minus four in [location].",
          description: "Lists all dates where the daily maximum temperature was below -4°F in the specified location.",
          picture: "/days-below-4.png",
        },
        {
          command: "Show all [location] temperatures.",
          description: "Displays all available daily temperature data for the specified location.",
          picture: "/show-most-temps.png",
        }
      ]
    },
    {
      title: "Climate & Environmental Data",
      commands: [
        {
          command: "Show [location] drought.",
          description: "Displays drought index data (PDSI) for the specified location.",
          picture: "/drought.png",
        },
        {
          command: "Show drought.",
          description: "Displays drought index data (PDSI) for the United States.",
          picture: "/drought.png",
        },
        {
          command: "Show Arctic sea ice.",
          description: "Displays Arctic sea ice extent or area data.",
          picture: "/arctic-sea-ice.png",
        },
        {
          command: "Show Arctic sea ice OSI.",
          description: "Displays Arctic sea ice data from the OSI (Ocean and Sea Ice) dataset.",
          picture: "/arctic-sea-ice.png",
        },
        {
          command: "Show Arctic sea ice area.",
          description: "Displays the area of Arctic sea ice.",
          picture: "/arctic-sea-ice.png",
        },
        {
          command: "Show Arctic sea ice NSIDC.",
          description: "Displays Arctic sea ice data from the NSIDC (National Snow and Ice Data Center) dataset.",
          picture: "/arctic-sea-ice.png",
        },
        {
          command: "Show Antarctic sea ice.",
          description: "Displays Antarctic sea ice extent or area data.",
          picture: "/arctic-sea-ice.png",
        },
        {
          command: "Show CO2.",
          description: "Displays atmospheric carbon dioxide (CO2) data.",
          picture: "/co2.png",
        },
        {
          command: "Show Briffa's reconstruction.",
          description: "Displays Briffa's Northern Hemisphere climate reconstruction data.",
          picture: "/briffa.png",
        },
        {
          command: "Show hurricanes.",
          description: "Displays hurricane data.",
          picture: "/hurricane.jpg",
        },
        {
          command: "Show forest fires.",
          description: "Displays data on forest fires.",
          picture: "/forest-fires.png",
        },
        {
          command: "Show ENSO.",
          description: "Displays El Niño–Southern Oscillation (ENSO) data.",
          picture: "/enso.png",
        },
        {
          command: "Show La Nina.",
          description: "Displays La Niña event data.",
          picture: "/enso.png",
        },
        {
          command: "Show El Nino.",
          description: "Displays El Niño event data.",
          picture: "/enso.png",
        }
      ]
    },
    {
      title: "Financial & Miscellaneous Data",
      commands: [
        {
          command: "Show Intel stock price.",
          description: "Displays the current or historical stock price for Intel (INTC).",
          picture: "/intel-price.png",
        },
        {
          command: "Show Nvidia stocks.",
          description: "Displays the current or historical stock price for Nvidia (NVDA).",
          picture: "/nvda-price.png",
        },
        {
          command: "Show sunspots.",
          description: "Displays historical sunspot count data.",
          picture: "/briffa.png",
        },
        {
          command: "Show US population.",
          description: "Displays US population data.",
          picture: "/us-population.png",
        },
        {
          command: "Show map.",
          description: "Displays a map relevant to the current data or context.",
          picture: "/map.png",
        },
        {
          command: "Compare maps.",
          description: "Displays a comparison between different maps."
        }
      ]
    },
    {
      title: "Time Range Selection",
      commands: [
        {
          command: "Plot the last five years.",
          description: "Displays data for the most recent five years."
        },
        {
          command: "Plot the last two months.",
          description: "Displays data for the most recent two months."
        },
        {
          command: "Plot the last sixty days.",
          description: "Displays data for the most recent sixty days."
        },
        {
          command: "Plot the last year.",
          description: "Displays data for the most recent year."
        },
        {
          command: "Show the last 120 years.",
          description: "Displays data for the most recent 120 years."
        },
        {
          command: "Show range 1957 to 1980.",
          description: "Displays data from 1957 through 1980."
        },
        {
          command: "Plot range 1963 to 1984.",
          description: "Displays data from 1963 through 1984."
        },
        {
          command: "Plot begin 1963.",
          description: "Displays data starting from the year 1963."
        },
        {
          command: "Plot start 1990.",
          description: "Displays data starting from the year 1990."
        },
        {
          command: "Plot end 2000.",
          description: "Displays data up to the year 2000."
        },
        {
          command: "Show full range.",
          description: "Displays the entire available data range."
        }
      ]
    },
    {
      title: "Chart Customization",
      commands: [
        {
          command: "Center 32.",
          description: "Centers the graph at the value 32."
        },
        {
          command: "Set point size to 1.5.",
          description: "Sets the size of points on the graph to 1.5."
        },
        {
          command: "Set vertical lines to 14.",
          description: "Displays 14 vertical grid lines on the graph."
        },
        {
          command: "Set horizontal lines to 15.",
          description: "Displays 15 horizontal grid lines on the graph."
        },
        {
          command: "Set minimum to 12.",
          description: "Sets the lower limit (minimum value) of the graph's Y-axis to 12."
        },
        {
          command: "Set Y maximum to 22 thousand.",
          description: "Sets the upper limit (maximum value) of the graph's Y-axis to 22,000."
        },
        {
          command: "Set chart title to [your title].",
          description: "Sets the main title of the chart."
        },
        {
          command: "Set vertical title to [your title].",
          description: "Sets the Y-axis (vertical) title of the chart."
        },
        {
          command: "Set horizontal title to [your title].",
          description: "Sets the X-axis (horizontal) title of the chart."
        },
        {
          command: "Reset zoom.",
          description: "Resets the graph's zoom to the default view."
        }
      ]
    },
    {
      title: "Chart Types & Visualization",
      commands: [
        {
          command: "Show bar chart.",
          description: "Displays the data as a bar chart."
        },
        {
          command: "Show line graph.",
          description: "Displays the data as a line graph."
        },
        {
          command: "Show scatter plot.",
          description: "Displays the data as a scatter plot."
        },
        {
          command: "Plot by year.",
          description: "Displays data as a yearly plot."
        },
        {
          command: "Plot trend.",
          description: "Displays a trend line on the graph."
        },
        {
          command: "Turn plot trend off.",
          description: "Removes the trend line from the graph."
        },
        {
          command: "Take screenshot.",
          description: "Captures a screenshot of the current graph."
        }
      ]
    },
    {
      title: "Data Analysis",
      commands: [
        {
          command: "Explain the graph.",
          description: "Provides a description or interpretation of the currently displayed graph."
        },
        {
          command: "Show percent gain.",
          description: "Displays the percent gain of the dataset over the selected period."
        },
        {
          command: "Show annual growth.",
          description: "Displays the annual growth rate of the data."
        },
        {
          command: "Show difference.",
          description: "Displays the difference between two data series."
        },
        {
          command: "Show moving average 365.",
          description: "Displays a moving average with a 365-day window."
        },
        {
          command: "Show mean 12.",
          description: "Displays a moving average with a 12-point window."
        },
        {
          command: "Show FFT.",
          description: "Displays the fast Fourier transform (FFT) of the data."
        },
        {
          command: "Select all.",
          description: "Selects all data points or series in the graph."
        },
        {
          command: "Show annual range.",
          description: "Displays the range of values for each year."
        },
        {
          command: "Show required range 1921 to 2021.",
          description: "Displays data for the specified range of years (1921 to 2021)."
        },
        {
          command: "Show annual count.",
          description: "Displays the annual count of the relevant data points."
        },
        {
          command: "Show annual records.",
          description: "Displays annual record values for the dataset."
        },
        {
          command: "Show daily total.",
          description: "Displays the daily total or sum of the relevant data."
        },
        {
          command: "Show rank reverse.",
          description: "Displays the data ranked in reverse order."
        },
        {
          command: "Rank series.",
          description: "Ranks the data series by value."
        },
        {
          command: "Sort data.",
          description: "Sorts the data in ascending or descending order."
        }
      ]
    }
  ];
  
  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Box>
          <Heading as="h1" size="xl" mb={4} color={accentColor}>
            Available Commands
          </Heading>
          <Text fontSize="lg" mb={6}>
            Below is a comprehensive list of commands you can use with our graph interface, organized by category. 
            Each command has a description of what it does. Hover over any command to see a visual example of its output.
            For location-specific commands, replace [location] with your desired location (e.g., a state name like "Texas").
          </Text>
        </Box>

        <Divider />

        <Box maxH="70vh" overflowY="auto" pr={2}>
          {commandCategories.map((category, idx) => (
            <CommandCategory 
              key={idx} 
              title={category.title} 
              commands={category.commands} 
            />
          ))}
        </Box>
      </Stack>
    </Container>
  );
}