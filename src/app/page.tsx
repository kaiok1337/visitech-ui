'use client';

import { 
  Box, 
  Button, 
  Container, 
  Flex, 
  Heading, 
  Stack, 
  Text, 
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaMoon, FaSun, FaSignInAlt, FaBook } from 'react-icons/fa';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const accentColor = useColorModeValue('brand.accent1', 'brand.accent1');
  
  return (
    <Box minH="100vh" bg={useColorModeValue('brand.lightBg', 'brand.darkBg')}>
      <Container maxW="container.xl">
        <Flex justifyContent="flex-end" pt={4}>
          <Button 
            onClick={toggleColorMode} 
            variant="ghost"
          >
            {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </Flex>
        
        <Stack
          as={Box}
          textAlign="center"
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight="110%"
          >
            Welcome to <br />
            <Text as="span" color={accentColor}>
              Next.js with Chakra UI
            </Text>
          </Heading>
          
          <Text color={useColorModeValue('gray.600', 'gray.300')} maxW="3xl" mx="auto">
            A modern, responsive web application built with Next.js and Chakra UI.
          </Text>
          
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={4}
            justify="center"
          >
            <Link href="/login" passHref>
              <Button
                as="a"
                rounded="full"
                size="lg"
                bg="brand.accent1"
                color="white"
                _hover={{ bg: 'blue.500' }}
              >
                Login
              </Button>
            </Link>
            <Link href="/docs" passHref>
              <Button
                as="a"
                rounded="full"
                size="lg"
                colorScheme="gray"
              >
                Documentation
              </Button>
            </Link>
          </Stack>
          
          <Box textAlign="center">
            <Image
              src="/next.svg"
              alt="Next.js Logo"
              width={180}
              height={37}
              style={{
                filter: colorMode === 'dark' ? 'invert(1)' : 'none',
                margin: '0 auto'
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
