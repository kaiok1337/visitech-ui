'use client';

import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Button,
  Icon,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { FiExternalLink, FiInfo } from 'react-icons/fi';
import KeybindsMenu from '../../components/KeybindsMenu';

export default function KeybindsGuide() {
  const accentColor = useColorModeValue('brand.accent1', 'brand.accent1');
  
  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Box>
          <Heading as="h1" size="xl" mb={4} color={accentColor}>
            Keyboard Shortcuts & Mouse Controls
          </Heading>
          <Text fontSize="lg" mb={6}>
            Master the graph interface with these keyboard shortcuts and mouse controls.
          </Text>
        </Box>

        <Alert 
          status="info"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          borderRadius="lg"
          p={6}
        >
          <AlertIcon boxSize="40px" mr={0} mb={4} />
          <AlertTitle mt={0} mb={2} fontSize="lg">
            Shortcuts Now Available in Navigation Bar!
          </AlertTitle>
          <AlertDescription maxWidth="lg">
            <Text mb={4}>
              For quick access, we've moved the keyboard shortcuts into an interactive menu in the navigation bar. 
              Click the "Shortcuts" button at the top of any page to view all keyboard shortcuts with visual demonstrations.
            </Text>
            <Button
              colorScheme="blue"
              leftIcon={<Icon as={FiExternalLink} />}
              onClick={() => {
                // This is just for demonstration - the actual menu is in the navbar
                alert("The shortcuts menu is located in the top navigation bar");
              }}
            >
              Open Shortcuts Menu
            </Button>
          </AlertDescription>
        </Alert>

        {/* For demonstration purposes, include the component here as well */}
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <Heading size="md" mb={4}>
            Keyboard Shortcuts Menu Preview
          </Heading>
          <KeybindsMenu />
          <Text fontSize="sm" mt={4} color="gray.500">
            This menu is also always available in the top navigation bar for quick access from any page.
          </Text>
        </Box>
      </Stack>
    </Container>
  );
}