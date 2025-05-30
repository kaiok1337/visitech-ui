'use client';

import {
  Box,
  VStack,
  Heading,
  Text,
  Link,
  Divider,
  Icon,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaCode, FaChartLine, FaQuestion, FaBook, FaRocket, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isActive?: boolean;
  isCollapsed?: boolean;
}

function NavItem({ href, icon, children, isActive, isCollapsed }: NavItemProps) {
  const accentColor = useColorModeValue('brand.accent1', 'brand.accent1');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');
  
  const titleText = typeof children === 'string' ? children : '';
  
  return (
    <Link
      as={NextLink}
      display="flex"
      alignItems="center"
      gap={3}
      p={3}
      borderRadius="lg"
      fontWeight={isActive ? "semibold" : "medium"}
      color={isActive ? accentColor : textColor}
      bg={isActive ? activeBg : "transparent"}
      _hover={{ 
        bg: isActive ? activeBg : hoverBg, 
        textDecoration: 'none',
        transform: 'translateX(2px)',
        transition: 'all 0.2s ease-in-out',
        color: isActive ? accentColor : mutedColor
      }}
      transition="all 0.2s ease-in-out"
      href={href}
      role="group"
      title={isCollapsed ? titleText : undefined}
    >
      <Icon 
        as={icon} 
        boxSize={5} 
        color={isActive ? accentColor : "gray.500"}
        _groupHover={{
          color: isActive ? accentColor : mutedColor,
          transform: 'scale(1.1)',
        }}
        transition="all 0.2s"
      />
      {!isCollapsed && <Text fontSize="sm">{children}</Text>}
    </Link>
  );
}

export default function MainNavigation() {
  const pathname = usePathname();
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bgColor = useColorModeValue('white', 'gray.800');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box
      w={isCollapsed ? '60px' : { base: '260px', lg: '280px' }}
      borderRight="1px solid"
      borderColor={borderColor}
      height="100vh"
      position="fixed"
      left={0}
      top={0}
      overflowY="auto"
      bg={bgColor}
      boxShadow="lg"
      transition="width 0.2s ease-in-out"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: useColorModeValue('gray.200', 'gray.700'),
          borderRadius: '24px',
        },
      }}
    >
      <IconButton
        aria-label="Toggle navigation"
        icon={isCollapsed ? <FaBars /> : <FaTimes />}
        position="absolute"
        right={isCollapsed ? "-12px" : "-16px"}
        top="20px"
        size="sm"
        colorScheme="gray"
        borderRadius="full"
        onClick={() => setIsCollapsed(!isCollapsed)}
        zIndex={2}
      />

      <VStack align="stretch" spacing={1} px={isCollapsed ? 2 : 4} pt={6}>
        {!isCollapsed && (
          <Heading 
            size="md" 
            mb={8} 
            px={3} 
            pb={3}
            borderBottom="1px solid"
            borderColor={borderColor}
            color={useColorModeValue('gray.800', 'white')}
            letterSpacing="tight"
            fontWeight="bold"
          >
            Your App Name
          </Heading>
        )}
        
        <NavItem 
          href="/" 
          icon={FaHome} 
          isActive={pathname === '/'}
          isCollapsed={isCollapsed}
        >
          Home
        </NavItem>

        {!isCollapsed && (
          <Heading 
            size="xs" 
            mt={8} 
            mb={3} 
            px={3} 
            color={useColorModeValue('gray.600', 'gray.400')}
            letterSpacing="wide"
            textTransform="uppercase"
            fontSize="xs"
            fontWeight="bold"
          >
            Tools
          </Heading>
        )}
        
        <NavItem 
          href="/graphing.html" 
          icon={FaChartLine}
          isActive={pathname === '/graphing.html'}
          isCollapsed={isCollapsed}
        >
          Graphing Tool
        </NavItem>

        <NavItem 
          href="/docs" 
          icon={FaBook}
          isActive={pathname.startsWith('/docs')}
          isCollapsed={isCollapsed}
        >
          Documentation
        </NavItem>
        
        {!isCollapsed && <Divider my={8} borderColor={borderColor} opacity={0.6} />}
        
        <NavItem 
          href="/login" 
          icon={FaRocket}
          isActive={pathname === '/login'}
          isCollapsed={isCollapsed}
        >
          Get Started
        </NavItem>
      </VStack>
    </Box>
  );
} 