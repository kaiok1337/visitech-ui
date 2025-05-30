'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  useColorModeValue,
  Image
} from '@chakra-ui/react';

interface TeamMemberProps {
  name: string;
  title: string;
  description: string[];
  imageUrl?: string;
}

function TeamMember({ name, title, description, imageUrl }: TeamMemberProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={name}
          borderRadius="full"
          boxSize="150px"
          objectFit="cover"
          mx="auto"
          mb={4}
        />
      )}
      <VStack align="start" spacing={3}>
        <Heading size="md">{name}</Heading>
        <Text color="blue.500" fontWeight="semibold">
          {title}
        </Text>
        {description.map((paragraph, index) => (
          <Text key={index} color={useColorModeValue('gray.600', 'gray.300')}>
            {paragraph}
          </Text>
        ))}
      </VStack>
    </Box>
  );
}

export default function TeamPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const teamMembers: TeamMemberProps[] = [
    {
      name: 'Dave Lehman',
      title: 'Executive Chairman',
      description: [
        'Accomplished professional, businessman and entrepreneur:',
        'Dave holds a Ph.D in the Geosciences from The University of Texas at Austin, and had a distinguished career as an Executive with ExxonMobil.',
        'In the last 20 years he has founded three startups, selling the first two for returns of 10 times and 8 times, respectively, to his investors. The third was successfully merged with a larger company and is ongoing.',
        "Dave's ability to see otherwise unrecognized opportunities in developing areas is exemplified by his support of Visitech.ai.",
        "Dave's philanthropic endeavors include his support for the U.S. Women's Olympic Wrestling team, and \"Beat the Streets Wrestling\", a program for at risk youth in his hometown of Lancaster, PA."
      ],
      imageUrl: '/team/dave-lehman.jpg' // Add actual image path
    },
    {
      name: 'Tony Heller',
      title: 'Chief Technology Officer - CTO',
      description: [
        'Tony Heller has nearly fifty years of professional science and engineering experience working with large data sets. He developed the core Visitech technology to address limitations with existing methodologies.',
        `Tony's experience includes a wide range of science research and engineering development, including helping design the first two billion transistor microprocessor for Intel.`
      ],
      imageUrl: '/team/tony-heller.jpg' // Add actual image path
    },
    {
      name: 'David Heller',
      title: 'VP of Data Science',
      description: [
        'Data science and AI expert with 7 years of experience, including impactful roles at Microsoft and Ford.',
        'Skilled in creating scalable, data-driven solutions and transforming complex datasets into actionable insights.',
        'Known for blending analytical rigor with creative problem-solving to drive AI advancements.'
      ],
      imageUrl: '/team/david-heller.jpg' // Add actual image path
    },
    {
      name: 'Donny DeBruno',
      title: 'VP of Marketing',
      description: [
        'Led a successful design business for 15 years, specializing in visual storytelling across physical and digital spaces.',
        'Founded multiple ventures focused on crafting compelling narratives through Photography, Printmaking, Industrial Design, and UX/UI.',
        'Spearheading research-driven marketing and visual design initiatives to create engaging branding.'
      ],
      imageUrl: '/team/donny-debruno.jpg' // Add actual image path
    },
    {
        name: 'Kai Oklesson',
        title: 'Lead Full Stack Engineer',
        description: [
          'Innovative full stack engineer with a passion for creating intuitive and engaging user experiences.',
          'Specializes in developing sophisticated applications with a focus on clean, maintainable code and modern development practices.',
          'Known for pushing technical boundaries and bringing fresh perspectives to solve complex challenges.',
          'Drives technological innovation through the implementation of cutting-edge frameworks and development methodologies.'
        ],
        imageUrl: '/team/kai-oklesson.jpg' // Add actual image path
      },
  ];

  return (
    <Box bg={bgColor} minH="calc(100vh - 64px)" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          <Box textAlign="center">
            <Heading size="2xl" mb={4}>
              Our Team
            </Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.300')}>
              Meet the experts behind Visitech.ai
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            {teamMembers.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}