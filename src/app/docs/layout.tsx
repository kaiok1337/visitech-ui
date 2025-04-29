'use client';

import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Link,
  Divider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBook, FaCode, FaChartLine, FaQuestion, FaHome } from 'react-icons/fa';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavItem = ({ href, icon, children, isActive }: NavItemProps) => {
  const bgActive = useColorModeValue('blue.50', 'blue.900');
  const bgHover = useColorModeValue('gray.100', 'gray.700');
  const accentColor = useColorModeValue('brand.accent1', 'brand.accent1');
  
  return (
    <NextLink href={href} passHref>
      <Link
        display="flex"
        alignItems="center"
        gap={3}
        p={3}
        borderRadius="md"
        fontWeight={isActive ? "semibold" : "normal"}
        color={isActive ? accentColor : "inherit"}
        bg={isActive ? bgActive : "transparent"}
        _hover={{ bg: isActive ? bgActive : bgHover, textDecoration: 'none' }}
      >
        <Icon as={icon} boxSize={5} />
        <Text>{children}</Text>
      </Link>
    </NextLink>
  );
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bgColor = useColorModeValue('white', 'gray.800');
  
  return (
    <Flex>
      {/* Sidebar */}
      <Box
        w="280px"
        borderRight="1px solid"
        borderColor={borderColor}
        py={6}
        px={4}
        position="fixed"
        alignSelf="flex-start"
        height="100vh"
        overflowY="auto"
        bg={bgColor}
      >
        <VStack align="stretch" spacing={1}>
          <Image src="/logo.png" alt="Logo" width={300} height={100} className='mb-6' />
          <Heading size="md" mb={4} px={3}>Documentation</Heading>
          
          <NavItem 
            href="/docs" 
            icon={FaHome} 
            isActive={pathname === '/docs'}
          >
            Overview
          </NavItem>
          
          <Heading size="xs" mt={6} mb={2} px={3} color="gray.500">
            USER GUIDES
          </Heading>
          
          <NavItem 
            href="/docs/getting-started" 
            icon={FaBook}
            isActive={pathname === '/docs/getting-started'}
          >
            Getting Started
          </NavItem>
          
          <NavItem 
            href="/docs/prompt-guide" 
            icon={FaCode}
            isActive={pathname === '/docs/prompt-guide'}
          >
            Prompt Design
          </NavItem>
          
          <Heading size="xs" mt={6} mb={2} px={3} color="gray.500">
            FEATURES
          </Heading>
          
          <NavItem 
            href="/docs/data-visualization" 
            icon={FaChartLine}
            isActive={pathname === '/docs/data-visualization'}
          >
            Data Visualization
          </NavItem>
          
          <NavItem 
            href="/docs/advanced-queries" 
            icon={FaCode}
            isActive={pathname === '/docs/advanced-queries'}
          >
            Advanced Queries
          </NavItem>
          
          <Divider my={6} />
          
          <NavItem 
            href="/docs/faq" 
            icon={FaQuestion}
            isActive={pathname === '/docs/faq'}
          >
            FAQ & Troubleshooting
          </NavItem>
        </VStack>
      </Box>
      
      {/* Main content */}
      <Box flex={1} bg={useColorModeValue('brand.lightBg', 'brand.darkBg')}>
        {children}
      </Box>
    </Flex>
  );
}