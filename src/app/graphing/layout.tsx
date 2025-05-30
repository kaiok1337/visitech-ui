'use client';

import { Box } from '@chakra-ui/react';

export default function GraphingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box 
      as="main" 
      width="100%" 
      height="100vh" 
      overflow="hidden" 
      padding={0}
    >
      {children}
    </Box>
  );
} 