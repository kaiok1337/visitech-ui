'use client';

import { useEffect, useState, Suspense } from 'react';
import { 
  Box, 
  HStack, 
  Link as ChakraLink, 
  Image, 
  Button, 
  Icon, 
  Drawer,
  DrawerBody,
  DrawerContent,
  VStack,
  Text,
  useDisclosure,
  Divider,
  useColorModeValue,
  IconButton
} from '@chakra-ui/react';
import { authStateChanged } from '../firebaseBridge';
import dynamic from 'next/dynamic';
import { RiSparklingLine, RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { FaCode, FaComments, FaFileContract, FaQuestionCircle, FaBook, FaUsers } from 'react-icons/fa';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

// Dynamically import KeybindsMenu
const KeybindsMenu = dynamic(() => import('./KeybindsMenu'), {
  ssr: false,
  loading: () => <button className="fallback-button">Shortcuts</button>
});

// Fallback button in case the component fails to load
const KeybindsFallback = () => (
  <button className="fallback-button">Shortcuts</button>
);

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ href, icon, children, isActive, onClick }: NavItemProps) {
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  
  return (
    <ChakraLink
      as={NextLink}
      display="flex"
      alignItems="center"
      gap={3}
      p={3}
      borderRadius="md"
      fontWeight={isActive ? "semibold" : "normal"}
      color={isActive ? accentColor : "inherit"}
      _hover={{ 
        bg: hoverBg,
        textDecoration: 'none',
        transform: 'translateX(2px)',
      }}
      transition="all 0.2s"
      href={href}
      onClick={onClick}
    >
      <Icon as={icon} boxSize={5} color={isActive ? accentColor : "gray.500"} />
      <Text>{children}</Text>
    </ChakraLink>
  );
}

export default function NavbarWithKeyBinds() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = authStateChanged((user: any) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Box 
        as="nav" 
        position="sticky"
        top="0"
        zIndex="sticky"
        transition="all 0.2s"
        bg="white"
        borderBottom="1px solid"
        borderColor={scrolled ? 'gray.200' : 'transparent'}
        backdropFilter="blur(10px)"
        backgroundColor={scrolled ? 'rgba(255, 255, 255, 0.9)' : 'white'}
        _dark={{
          bg: scrolled ? 'rgba(26, 32, 44, 0.9)' : 'gray.800',
          borderColor: scrolled ? 'gray.700' : 'transparent',
        }}
        boxShadow={scrolled ? 'sm' : 'none'}
      >
        <Box px={6} py={2}>
          <HStack spacing={8} align="center">
            <IconButton
              aria-label="Menu"
              icon={isOpen ? <Icon as={RiCloseLine} boxSize={6} /> : <Icon as={RiMenuLine} boxSize={6} />}
              variant="ghost"
              size="lg"
              onClick={onOpen}
              _hover={{ bg: 'transparent' }}
              _active={{ bg: 'transparent' }}
              transition="all 0.2s"
            />
            
            <NextLink href="/" passHref>
              <Box 
                as="a" 
                display="flex" 
                alignItems="center"
                _hover={{ transform: 'scale(1.02)' }}
                transition="transform 0.2s"
              >
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  height="56px"
                  width="auto"
                  _dark={{ filter: 'brightness(0.9)' }}
                />
              </Box>
            </NextLink>

            <HStack spacing={4} ml="auto">
              {!isAuthenticated ? (
                <Button
                  as={ChakraLink}
                  href="/login"
                  variant="ghost"
                  size="md"
                >
                  Login
                </Button>
              ) : (
                <Button
                  as={ChakraLink}
                  href="/graphing"
                  variant="solid"
                  size="md"
                  colorScheme="blue"
                  leftIcon={<Icon as={RiSparklingLine} />}
                  _hover={{
                    transform: 'translateY(-1px)',
                    boxShadow: 'md',
                  }}
                >
                  AI Graphing Tool
                </Button>
              )}
              
              <Suspense fallback={<KeybindsFallback />}>
                <KeybindsMenu />
              </Suspense>
            </HStack>
          </HStack>
        </Box>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="md"
      >
        <DrawerContent>
          <Box px={6} py={2} borderBottom="1px solid" borderColor={borderColor}>
            <HStack spacing={8} align="center">
              <IconButton
                aria-label="Close Menu"
                icon={<Icon as={RiCloseLine} boxSize={6} />}
                variant="ghost"
                size="lg"
                onClick={onClose}
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
              />
              
              <NextLink href="/" passHref>
                <Box 
                  as="a" 
                  display="flex" 
                  alignItems="center"
                >
                  <Image 
                    src="/logo.png" 
                    alt="Logo" 
                    height="56px"
                    width="auto"
                    _dark={{ filter: 'brightness(0.9)' }}
                  />
                </Box>
              </NextLink>
            </HStack>
          </Box>
          
          <DrawerBody>
            <VStack align="stretch" spacing={1}>
              <NavItem 
                href="/guide" 
                icon={FaBook} 
                isActive={pathname === '/guide'}
                onClick={onClose}
              >
                User Guide
              </NavItem>
              
              <NavItem 
                href="/prompt-guide" 
                icon={FaCode}
                isActive={pathname === '/prompt-guide'}
                onClick={onClose}
              >
                Available Commands
              </NavItem>
              
              <Divider my={4} />
              
              <NavItem 
                href="/team" 
                icon={FaUsers}
                isActive={pathname === '/team'}
                onClick={onClose}
              >
                Our Team
              </NavItem>
              
              <NavItem 
                href="/feedback" 
                icon={FaComments}
                isActive={pathname === '/feedback'}
                onClick={onClose}
              >
                Feedback
              </NavItem>
              
              <NavItem 
                href="/terms" 
                icon={FaFileContract}
                isActive={pathname === '/terms'}
                onClick={onClose}
              >
                Terms of Use
              </NavItem>
              
              <NavItem 
                href="/faq" 
                icon={FaQuestionCircle}
                isActive={pathname === '/faq'}
                onClick={onClose}
              >
                FAQ
              </NavItem>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}