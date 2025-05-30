'use client';

import { Box, useColorModeValue } from '@chakra-ui/react';
import { motion, type MotionValue } from 'framer-motion';

const MotionBox = motion(Box);

interface WaveDividerProps {
  flip?: boolean;
  color?: string;
  yOffset?: MotionValue<number>;
}

export const WaveDivider = ({ flip = false, color, yOffset }: WaveDividerProps) => {
  const bgColor = color || useColorModeValue('white', 'gray.800');

  return (
    <MotionBox
      position="absolute"
      bottom={flip ? 'auto' : 0}
      top={flip ? 0 : 'auto'}
      left={0}
      right={0}
      height="150px"
      overflow="hidden"
      style={{ y: yOffset }}
    >
      <svg
        viewBox="0 0 2880 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          bottom: flip ? 'auto' : 0,
          top: flip ? 0 : 'auto',
          width: '100%',
          height: '100%',
          transform: `scale(1.1) ${flip ? 'rotate(180deg)' : ''}`,
        }}
      >
        <path
          fill={bgColor}
          d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,165.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,480L0,480Z"
        />
      </svg>
    </MotionBox>
  );
};