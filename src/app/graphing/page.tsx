'use client';

import { useEffect, useState } from 'react';
import { Box, Heading, Spinner, Center, Button, HStack, Icon, Text } from '@chakra-ui/react';
import { FiMaximize2, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authStateChanged } from '../firebaseBridge';

export default function GraphingWrapper() {
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  // Check authentication state
  useEffect(() => {
    const unsubscribe = authStateChanged((user) => {
      if (!user) {
        // If no user is signed in, redirect to login
        router.push('/login');
      } else {
        setAuthChecked(true);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Handle iframe loading
  const handleIframeLoad = () => {
    setLoading(false);
  };

  // Open in a new window/tab for full screen experience
  const openInNewWindow = () => {
    window.open('/graphing.html', '_blank');
  };

  // Show loading state while checking auth
  if (!authChecked) {
    return (
      <Center height="100vh">
        <Box textAlign="center">
          <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" mb={4} />
          <Heading size="md">Checking authentication...</Heading>
        </Box>
      </Center>
    );
  }

  return (
    <Box position="relative" height="calc(100vh - 80px)" width="100%">
      {/* Controls for the iframe */}
      <HStack 
        spacing={4} 
        p={3} 
        bg="white" 
        borderBottom="1px solid" 
        borderColor="gray.200"
        _dark={{
          bg: "gray.800",
          borderColor: "gray.700"
        }}
      >
        <Heading size="md">Graphing Tool</Heading>
        <Button 
          leftIcon={<Icon as={FiExternalLink} />} 
          size="sm" 
          onClick={openInNewWindow}
          colorScheme="blue"
          variant="outline"
        >
          Open in New Window
        </Button>
        <Text fontSize="sm" color="gray.500" ml="auto">
          Embedded view - some features may work better in full screen
        </Text>
      </HStack>

      {loading && (
        <Center position="absolute" top="40px" left="0" right="0" bottom="0" bg="rgba(255,255,255,0.7)" zIndex={1} _dark={{ bg: "rgba(26,32,44,0.7)" }}>
          <Box textAlign="center">
            <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" mb={4} />
            <Heading size="md">Loading Graphing Tool...</Heading>
          </Box>
        </Center>
      )}
      
      <Box position="relative" height="calc(100% - 45px)">
        <iframe 
          src="/graphing.html" 
          style={{ 
            width: '100%', 
            height: '100%', 
            border: 'none', 
            display: 'block',
          }}
          onLoad={handleIframeLoad}
          title="Graphing Tool"
        />
      </Box>
    </Box>
  );
} 