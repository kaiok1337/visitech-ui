'use client';

import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'

// Don't use theme or CacheProvider for now
export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
  )
} 