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
} from '@chakra-ui/react';
import { useState } from 'react';
import NextLink from 'next/link';
import { FaEye, FaEyeSlash, FaMoon, FaSun } from 'react-icons/fa';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const accentColor = useColorModeValue('brand.accent1', 'brand.accent1');
  
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('brand.lightBg', 'brand.darkBg')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'} color={accentColor}>
            Sign in to your account
          </Heading>
          <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'gray.300')}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={bgColor}
          boxShadow={'lg'}
          p={8}
          w={{ base: 'sm', md: 'md' }}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((show) => !show)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={5}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Link color={accentColor}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'brand.accent1'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
              <NextLink href="/" passHref>
                <Button
                  as="a"
                  variant="outline"
                  borderColor={accentColor}
                  color={accentColor}
                >
                  Back to Home
                </Button>
              </NextLink>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don&apos;t have an account?{' '}
                <Link color={'brand.accent2'} href={'#'}>
                  Register
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
        <Button 
          onClick={toggleColorMode} 
          alignSelf="center"
          variant="ghost"
          leftIcon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        >
          {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </Stack>
    </Flex>
  );
} 