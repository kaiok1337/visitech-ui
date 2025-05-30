'use client';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Link,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  useColorMode,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { FaEye, FaEyeSlash, FaMoon, FaSun } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { signIn, authStateChanged } from '../firebaseBridge';

// Firebase configuration that should match your public/index.js config
const firebaseConfig = {
  apiKey: "AIzaSyCkdN1OEWanIkrKMPYRvFTNNDQDVtEpFFw",
  authDomain: "d2tcode.firebaseapp.com",
  databaseURL: "https://d2tcode-default-rtdb.firebaseio.com",
  projectId: "d2tcode",
  storageBucket: "d2tcode.appspot.com",
  messagingSenderId: "1050127685381",
  appId: "1:1050127685381:web:a08d73ae4b74eb18de496c",
  measurementId: "G-JQVDFL43P2"
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const accentColor = useColorModeValue('brand.accent1', 'brand.accent1');

  useEffect(() => {
    // Check auth state using the bridge
    const unsubscribe = authStateChanged((user) => {
      if (user) {
        console.log("User is signed in:", user.email);
        router.push('/graphing');
      } else {
        console.log("No user is signed in");
      }
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Use the bridge function that works with both approaches
      await signIn(email, password);
      
      // If successful, the authStateChanged will handle redirect
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Authentication Error',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    // Open the sign-up modal instead of showing an alert
    onOpen();
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (signUpPassword !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (signUpPassword.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password should be at least 6 characters',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setSignUpLoading(true);
    
    try {
      // Make sure Firebase is loaded and initialized
      if (typeof window.firebase === 'undefined') {
        throw new Error('Firebase SDK not loaded. Please refresh the page and try again.');
      }
      
      // Initialize Firebase if needed
      if (!window.firebase.apps?.length) {
        window.firebase.initializeApp(firebaseConfig);
      }
      
      // Create the account
      const userCredential = await window.firebase.auth().createUserWithEmailAndPassword(
        signUpEmail, 
        signUpPassword
      );
      
      // Account created successfully
      toast({
        title: 'Account created',
        description: 'Your account has been created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // Close the modal
      onClose();
      
      // Redirect to graphing page
      router.push('/graphing');
      
    } catch (error: unknown) {
      console.error("Account creation error:", error);
      toast({
        title: 'Account Creation Error',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSignUpLoading(false);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={bgColor}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={handleSignIn}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input 
                  type="password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={loading}
              >
                Sign in
              </Button>
              <NextLink href="/" passHref>
                <Button variant="outline">
                  Back to Home
                </Button>
              </NextLink>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
} 