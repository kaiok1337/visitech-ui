'use client';

import {
  Box,
  Button,
  Container,
  Stack,
  Heading,
  Text,
  Flex,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Spacer,
  IconButton,
  Link,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { 
  FaSignInAlt, 
  FaBook,
  FaBolt,          // Speed: Lightning bolt for fast performance
  FaBrain,         // Analysis: Brain for AI/intelligence
  FaExpandAlt,     // Scalability: Expanding arrows
  FaPlug,          // Integration: Plug for system connections
  FaRegGem,
  FaCrown,
  FaRocket,
  FaBuilding,
  FaCheck,
  FaSeedling,     // New: for Free tier (representing growth potential)
  FaTools,        // New: for Pro tier (representing advanced tools)
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface FeatureProps {
  icon: React.ElementType;
  title: string;
  text: string;
}

const Feature = ({ icon, title, text }: FeatureProps) => {
  const textColor = useColorModeValue('gray.600', 'gray.300');
  
  return (
    <Stack spacing={4} textAlign="center">
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="full"
        bg="blue.500"
        mb={1}
        mx="auto"
      >
        <Icon as={icon} w={8} h={8} />
      </Flex>
      <Heading as="h3" size="lg" color={textColor}>
        {title}
      </Heading>
      <Text color={textColor}>{text}</Text>
    </Stack>
  );
};

const SectionDivider = () => (
  <Box position="relative" py={20}>
    <Box
      position="absolute"
      inset={0}
      bgGradient="linear(to-r, transparent, blue.500, transparent)"
      height="1px"
      opacity={0.2}
    />
    <Box
      position="absolute"
      left="50%"
      transform="translateX(-50%)"
      bg="blue.500"
      width="8px"
      height="8px"
      borderRadius="full"
      mt="-3px"
    />
  </Box>
);

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        position="relative"
        height="100vh"
        width="100%"
        backgroundImage="url('https://images.squarespace-cdn.com/content/v1/67102e499d47f76124d2b089/c71a14b6-01a9-4eaa-9f20-038105e7006e/Firefly_e0d02c74-4427-40c8-9247-8d61ae0f9c8c.jpeg')"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.5)"
        />
        
        <Container maxW="container.xl" position="relative" height="100%">
          <Flex height="100%" alignItems="center" justifyContent="center">
            <Stack spacing={6} textAlign="center" color="white">
              <Heading
                as="h1"
                fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                fontWeight="bold"
              >
                Welcome to Visitech.AI
              </Heading>
              <Text fontSize={{ base: 'lg', md: 'xl' }} maxW="2xl">
                Transforming healthcare through intelligent automation
              </Text>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify="center"
              >
                <Button
                  size="lg"
                  colorScheme="blue"
                  leftIcon={<FaSignInAlt />}
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="whiteAlpha"
                  leftIcon={<FaBook />}
                  onClick={() => window.location.href = '/docs'}
                >
                  Learn More
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </Container>
      </Box>

      {/* Why Choose Section */}
      <Box py={20}>
        <Container maxW="container.xl">
          <Stack spacing={12}>
            <Heading
              textAlign="center"
              fontSize={{ base: '3xl', md: '4xl' }}
              color={textColor}
              bgGradient="linear(to-r, blue.400, blue.600)"
              bgClip="text"
            >
              Why Choose Visitech.AI?
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
              <Feature
                icon={FaBolt}
                title="Speed"
                text="Experience unparalleled graphing speed, no matter the complexity or volume of your data."
              />
              <Feature
                icon={FaBrain}
                title="Analysis"
                text="AI assisted analysis to help you quickly understand your data"
              />
              <Feature
                icon={FaExpandAlt}
                title="Scalability"
                text="Our solutions scale seamlessly with your business, from statups to global enterprise."
              />
              <Feature
                icon={FaPlug}
                title="Integration"
                text="Visitech integrates effortlessly with your existing systems, enhancing your current workflows."
              />
            </SimpleGrid>

            <Box textAlign="center">
              <Button
                size="lg"
                colorScheme="blue"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Pricing
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>

      <SectionDivider />

      {/* Solutions Section */}
      <Box py={20}>
        <Container maxW="container.xl">
          <Stack spacing={16}>
            <Heading
              textAlign="center"
              fontSize={{ base: '3xl', md: '4xl' }}
              color={textColor}
              bgGradient="linear(to-r, blue.400, blue.600)"
              bgClip="text"
            >
              Our Solutions
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Box 
                p={8} 
                bg={useColorModeValue('white', 'gray.700')} 
                rounded="xl" 
                shadow="lg"
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-5px)', shadow: '2xl' }}
              >
                <Heading size="md" mb={4}>Healthcare Analytics</Heading>
                <Text>Advanced analytics and insights to improve patient care and operational efficiency.</Text>
              </Box>
              <Box 
                p={8} 
                bg={useColorModeValue('white', 'gray.700')} 
                rounded="xl" 
                shadow="lg"
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-5px)', shadow: '2xl' }}
              >
                <Heading size="md" mb={4}>Automated Documentation</Heading>
                <Text>AI-powered documentation that saves time and reduces errors.</Text>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      <SectionDivider />

      {/* Pricing Section */}
      <Box id="pricing" py={20}>
        <Container maxW="container.xl">
          <Stack spacing={16}>
            <Heading
              textAlign="center"
              fontSize={{ base: '3xl', md: '4xl' }}
              color={textColor}
              bgGradient="linear(to-r, blue.400, blue.600)"
              bgClip="text"
            >
              Pricing Plans
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
              {/* Free Plan */}
              <Box
                p={6}
                bg={useColorModeValue('white', 'gray.700')}
                rounded="xl"
                shadow="lg"
                borderWidth="1px"
                textAlign="center"
                display="flex"
                flexDirection="column"
                height="full"
              >
                <Box>
                  <Icon as={FaSeedling} w={8} h={8} color="blue.400" mb={4} />
                  <Heading size="md" mb={4}>Free</Heading>
                  <Text fontSize="5xl" fontWeight="bold" mb={4}>
                    $0<Text as="span" fontSize="xl" fontWeight="normal">/mo</Text>
                  </Text>
                  <Stack spacing={3} mb={6}>
                    <Flex align="center">
                      <Icon as={FaCheck} w={4} h={4} color="green.400" mr={2} />
                      <Text>Limited climate data access</Text>
                    </Flex>
                  </Stack>
                </Box>
                <Spacer />
                <Button colorScheme="blue" size="lg" w="full" mt={4}>Get Started</Button>
              </Box>

              {/* Premium Plan */}
              <Box
                p={6}
                bg={useColorModeValue('white', 'gray.700')}
                rounded="xl"
                shadow="lg"
                borderWidth="1px"
                textAlign="center"
                position="relative"
                borderColor="blue.400"
                display="flex"
                flexDirection="column"
                height="full"
              >
                <Box
                  position="absolute"
                  top="-2"
                  right="-2"
                  bg="blue.400"
                  color="white"
                  px={3}
                  py={1}
                  rounded="md"
                  fontSize="sm"
                >
                  Popular
                </Box>
                <Box>
                  <Icon as={FaCrown} w={8} h={8} color="blue.400" mb={4} />
                  <Heading size="md" mb={4}>Premium</Heading>
                  <Text fontSize="5xl" fontWeight="bold" mb={4}>
                    $20<Text as="span" fontSize="xl" fontWeight="normal">/mo</Text>
                  </Text>
                  <Stack spacing={3} mb={6}>
                    {[
                      'AI enabled data analysis and graphing',
                      'High speed graphs (1M+ points)',
                      'Graph any time series data',
                      'AI enabled stock charts',
                      'Extensive climate data',
                      'And much more...'
                    ].map((text, index) => (
                      <Flex key={index} align="center">
                        <Icon as={FaCheck} w={4} h={4} color="green.400" mr={2} />
                        <Text>{text}</Text>
                      </Flex>
                    ))}
                  </Stack>
                </Box>
                <Spacer />
                <Button colorScheme="blue" size="lg" w="full" mt={4}>Get Started</Button>
              </Box>

              {/* Pro Plan */}
              <Box
                p={6}
                bg={useColorModeValue('white', 'gray.700')}
                rounded="xl"
                shadow="lg"
                borderWidth="1px"
                textAlign="center"
                display="flex"
                flexDirection="column"
                height="full"
              >
                <Box>
                  <Icon as={FaTools} w={8} h={8} color="blue.400" mb={4} />
                  <Heading size="md" mb={4}>Pro</Heading>
                  <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Coming Soon!
                  </Text>
                  <Stack spacing={3} mb={6}>
                    <Flex align="center">
                      <Icon as={FaCheck} w={4} h={4} color="green.400" mr={2} />
                      <Text>Coming soon!</Text>
                    </Flex>
                  </Stack>
                </Box>
                <Spacer />
                <Button colorScheme="blue" size="lg" w="full" mt={4} isDisabled>Coming Soon</Button>
              </Box>

              {/* Enterprise Plan */}
              <Box
                p={6}
                bg={useColorModeValue('white', 'gray.700')}
                rounded="xl"
                shadow="lg"
                borderWidth="1px"
                textAlign="center"
                display="flex"
                flexDirection="column"
                height="full"
              >
                <Box>
                  <Icon as={FaBuilding} w={8} h={8} color="blue.400" mb={4} />
                  <Heading size="md" mb={4}>Enterprise</Heading>
                  <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Custom Solution
                  </Text>
                  <Stack spacing={3} mb={6}>
                    {[
                      'Comprehensive solutions for large enterprises',
                      'All Pro Features',
                      'Unlimited users',
                      'Custom integrations',
                      '24/7 dedicated support'
                    ].map((text, index) => (
                      <Flex key={index} align="center">
                        <Icon as={FaCheck} w={4} h={4} color="green.400" mr={2} />
                        <Text>{text}</Text>
                      </Flex>
                    ))}
                  </Stack>
                </Box>
                <Spacer />
                <Button colorScheme="blue" size="lg" w="full" mt={4}>Contact Us</Button>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      <SectionDivider />

      {/* Contact Section */}
      <Box py={20}>
        <Container maxW="container.xl">
          <Stack spacing={16}>
            <Heading
              textAlign="center"
              fontSize={{ base: '3xl', md: '4xl' }}
              color={textColor}
              bgGradient="linear(to-r, blue.400, blue.600)"
              bgClip="text"
            >
              Get In Touch
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {/* Contact Form */}
              <Box
                p={8}
                bg={useColorModeValue('white', 'gray.700')}
                rounded="xl"
                shadow="lg"
                transition="all 0.3s"
                _hover={{ shadow: '2xl' }}
              >
                <Stack spacing={6}>
                  <Heading size="md" mb={2}>Send us a message</Heading>
                  <Input
                    placeholder="Your Name"
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    size="lg"
                    _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                  />
                  <Input
                    placeholder="Your Email"
                    type="email"
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    size="lg"
                    _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                  />
                  <Textarea
                    placeholder="Your Message"
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    rows={5}
                    size="lg"
                    _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                  />
                  <Button 
                    colorScheme="blue" 
                    size="lg"
                    _hover={{
                      transform: 'translateY(-2px)',
                      shadow: 'lg',
                    }}
                  >
                    Send Message
                  </Button>
                </Stack>
              </Box>

              {/* Contact Info */}
              <Box
                p={8}
                bg={useColorModeValue('white', 'gray.700')}
                rounded="xl"
                shadow="lg"
                transition="all 0.3s"
                _hover={{ shadow: '2xl' }}
              >
                <Stack spacing={8}>
                  <Flex align="center">
                    <Icon as={FaEnvelope} w={6} h={6} color="blue.400" mr={4} />
                    <Box>
                      <Heading size="sm" mb={1}>Email</Heading>
                      <Text>contact@visitech.ai</Text>
                    </Box>
                  </Flex>
                  <Flex align="center">
                    <Icon as={FaMapMarkerAlt} w={6} h={6} color="blue.400" mr={4} />
                    <Box>
                      <Heading size="sm" mb={1}>Location</Heading>
                      <Text>Denver, CO</Text>
                    </Box>
                  </Flex>
                </Stack>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      <SectionDivider />

      {/* Footer */}
      <Box bg={useColorModeValue('gray.100', 'gray.900')} color={textColor}>
        <Container maxW="container.xl" py={16}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
            {/* Company Info */}
            <Stack spacing={6}>
              <Box>
                <Heading size="md" mb={4}>Visitech.AI</Heading>
                <Text fontSize="sm">
                  Transforming healthcare through intelligent automation and advanced analytics.
                </Text>
              </Box>
              <Stack direction="row" spacing={4}>
                <IconButton
                  aria-label="Twitter"
                  icon={<FaTwitter />}
                  rounded="full"
                  size="md"
                  colorScheme="blue"
                />
                <IconButton
                  aria-label="LinkedIn"
                  icon={<FaLinkedin />}
                  rounded="full"
                  size="md"
                  colorScheme="blue"
                />
                <IconButton
                  aria-label="GitHub"
                  icon={<FaGithub />}
                  rounded="full"
                  size="md"
                  colorScheme="blue"
                />
              </Stack>
            </Stack>

            {/* Quick Links */}
            <Stack>
              <Heading size="md" mb={4}>Quick Links</Heading>
              <Link href="#" color={textColor}>Home</Link>
              <Link href="#" color={textColor}>About Us</Link>
              <Link href="#" color={textColor}>Services</Link>
              <Link href="#" color={textColor}>Contact</Link>
            </Stack>

            {/* Services */}
            <Stack>
              <Heading size="md" mb={4}>Services</Heading>
              <Link href="#" color={textColor}>Data Analysis</Link>
              <Link href="#" color={textColor}>AI Solutions</Link>
              <Link href="#" color={textColor}>Healthcare Analytics</Link>
              <Link href="#" color={textColor}>Custom Integration</Link>
            </Stack>

            {/* Newsletter */}
            <Stack>
              <Heading size="md" mb={4}>Newsletter</Heading>
              <Text fontSize="sm" mb={4}>
                Subscribe to our newsletter for updates and insights.
              </Text>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter your email"
                  bg={useColorModeValue('white', 'gray.800')}
                  border={0}
                  _focus={{
                    bg: useColorModeValue('white', 'gray.800'),
                    outline: 'none',
                  }}
                />
                <Button colorScheme="blue" w="full">
                  Subscribe
                </Button>
              </Stack>
            </Stack>
          </SimpleGrid>

          {/* Copyright */}
          <Box
            borderTopWidth={1}
            borderStyle="solid"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            pt={8}
            mt={8}
            textAlign="center"
          >
            <Text fontSize="sm">
              © {new Date().getFullYear()} Visitech.AI. All rights reserved.
            </Text>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
