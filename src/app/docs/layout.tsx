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
  const accentColor = useColorModeValue('brand.accent1', 'brand.accent1');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  
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
        bg={isActive ? activeBg : "transparent"}
        _hover={{ 
          bg: isActive ? activeBg : hoverBg, 
          textDecoration: 'none',
          transform: 'translateX(2px)',
          transition: 'all 0.2s ease-in-out'
        }}
        transition="all 0.2s ease-in-out"
      >
        <Icon as={icon} boxSize={5} color={isActive ? accentColor : "gray.500"} />
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
  const mainBgColor = useColorModeValue('brand.lightBg', 'brand.darkBg');
  
  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box
        w={{ base: '260px', lg: '280px' }}
        borderRight="1px solid"
        borderColor={borderColor}
        position="sticky"
        top={0}
        alignSelf="flex-start"
        height="100vh"
        overflowY="auto"
        bg={bgColor}
        boxShadow="sm"
        zIndex={10}
        pt={6}
        pb={8}
      >
        <VStack align="stretch" spacing={1} px={4}>
          <Box mb={6} textAlign="center">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={200} 
              height={70} 
              style={{ margin: '0 auto' }}
            />
          </Box>
          
          <Heading 
            size="md" 
            mb={6} 
            px={3} 
            pb={2}
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            Documentation
          </Heading>
          
          <NavItem 
            href="/docs" 
            icon={FaHome} 
            isActive={pathname === '/docs'}
          >
            Overview
          </NavItem>
          
          <Heading 
            size="xs" 
            mt={8} 
            mb={2} 
            px={3} 
            color="gray.500"
            letterSpacing="0.5px"
            textTransform="uppercase"
            fontSize="xs"
          >
            User Guides
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
          
          <Heading 
            size="xs" 
            mt={8} 
            mb={2} 
            px={3} 
            color="gray.500"
            letterSpacing="0.5px"
            textTransform="uppercase"
            fontSize="xs"
          >
            Features
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
          
          <Divider my={8} borderColor={borderColor} opacity={0.6} />
          
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
      <Box 
        flex={1} 
        bg={mainBgColor}
        minH="100vh"
        position="relative"
        borderLeft="1px solid"
        borderColor={borderColor}
        marginLeft="-1px" // Handles double border
      >
        {children}
      </Box>
    </Flex>
  );
}