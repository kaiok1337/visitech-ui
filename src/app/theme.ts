'use client';

import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  colors: {
    brand: {
      darkBg: '#172536',
      lightBg: '#EAEFF6',
      accent1: '#0165e1',
      accent2: '#ee3124',
    },
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'brand.darkBg' : 'brand.lightBg',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  config,
});

export default theme; 