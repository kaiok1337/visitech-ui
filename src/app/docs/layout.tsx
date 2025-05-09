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
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBook, FaCode, FaChartLine, FaQuestion, FaHome } from 'react-icons/fa';
import KeybindsMenu from '../components/KeybindsMenu';

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
        href={href}
      >
        <Icon as={icon} boxSize={5} color={isActive ? accentColor : "gray.500"} />
        <Text>{children}</Text>
      </Link>
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
    <Flex minH="100vh" direction="column">
      {/* Top Navigation Bar with Keybinds Menu */}
      <Flex 
        width="100%" 
        height="60px" 
        bg={bgColor} 
        borderBottom="1px solid" 
        borderColor={borderColor}
        px={4}
        alignItems="center"
        justifyContent="space-between"
        position="sticky"
        top={0}
        zIndex={20}
      >
        <HStack spacing={4}>
          <Link as={NextLink} href="/" passHref>
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={120} 
              height={40} 
            />
          </Link>
        </HStack>
        
        <HStack spacing={4}>
          <KeybindsMenu />
          {/* Add other top navbar items here if needed */}
        </HStack>
      </Flex>
      
      <Flex flex={1}>
        {/* Sidebar */}
        <Box
          w={{ base: '260px', lg: '280px' }}
          borderRight="1px solid"
          borderColor={borderColor}
          position="sticky"
          top="60px" // Adjusted to account for the top navbar
          alignSelf="flex-start"
          height="calc(100vh - 60px)" // Subtract the navbar height
          overflowY="auto"
          bg={bgColor}
          boxShadow="sm"
          zIndex={10}
          pt={6}
          pb={8}
        >
          <VStack align="stretch" spacing={1} px={4}>
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
              href="/docs/prompt-guide" 
              icon={FaCode}
              isActive={pathname === '/docs/prompt-guide'}
            >
              Commands
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
          minH="calc(100vh - 60px)" // Adjusted for navbar
          position="relative"
          borderLeft="1px solid"
          borderColor={borderColor}
          marginLeft="-1px" // Handles double border
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}