import React from 'react'
import { Box } from '@mui/material'

function AnimatedBackground() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(135deg, #0e1418 0%, #161b22 50%, #21262d 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 50%, rgba(35, 134, 54, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(9, 105, 218, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(111, 66, 193, 0.1) 0%, transparent 50%)
          `,
          animation: 'float 20s ease-in-out infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)
          `,
          animation: 'shimmer 3s ease-in-out infinite',
        },
        '@keyframes float': {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '33%': {
            transform: 'translateY(-20px) rotate(1deg)',
          },
          '66%': {
            transform: 'translateY(-10px) rotate(-1deg)',
          },
        },
        '@keyframes shimmer': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      }}
    />
  )
}

export default AnimatedBackground