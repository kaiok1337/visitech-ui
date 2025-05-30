'use client';

import { Box, useColorModeValue } from '@chakra-ui/react';
import KeybindsMenu from './KeybindsMenu';

export default function FloatingKeybindsMenu() {
  const bgColor = useColorModeValue('white', 'gray.800');
  
  return (
    <Box
      position="fixed"
      top="20px"
      right="20px"
      zIndex={1000}
      bg={bgColor}
      p={2}
      borderRadius="md"
      boxShadow="lg"
    >
      <KeybindsMenu />
    </Box>
  );
} 