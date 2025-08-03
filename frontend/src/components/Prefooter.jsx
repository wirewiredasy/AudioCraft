import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Box, Typography, Grid, Paper, Button } from '@mui/material'
import { 
  VolumeOff, 
  Tune, 
  SwapHoriz, 
  ContentCut, 
  MusicNote,
  Security,
  Help,
  Build,
  Stars,
  AutoAwesome
} from '@mui/icons-material'

const prefooterItems = [
  {
    icon: Build,
    title: 'Explore Tools',
    description: 'Discover all audio processing tools',
    link: '/tools',
    color: '#4ade80'
  },
  {
    icon: Security,
    title: 'Privacy First',
    description: 'Your files are processed securely',
    link: '/privacy',
    color: '#3b82f6'
  },
  {
    icon: Help,
    title: 'How to Use',
    description: 'Step-by-step guides and tutorials',
    link: '/how-to-use',
    color: '#f59e0b'
  }
]

function Prefooter() {
  return (
    <Box sx={{ 
      py: 10, 
      px: 3,
      background: 'linear-gradient(135deg, rgba(26, 29, 41, 0.9) 0%, rgba(15, 20, 25, 0.95) 50%, rgba(0, 0, 0, 0.98) 100%)',
      backdropFilter: 'blur(25px)',
      border: '2px solid rgba(74, 222, 128, 0.2)',
      borderRadius: '32px',
      mt: 8,
      mx: 2,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(74, 222, 128, 0.1)'
    }}>
      {/* Enhanced 3D Animated Background */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(74, 222, 128, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
        `,
        opacity: 0.7,
        animation: 'gradientShift 8s ease-in-out infinite'
      }} />

      {/* Floating 3D Elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${['#4ade80', '#3b82f6', '#8b5cf6', '#f59e0b'][i % 4]} 0%, transparent 70%)`,
            left: `${10 + (i * 12)}%`,
            top: `${20 + Math.sin(i) * 30}%`,
            filter: 'blur(1px)',
            opacity: 0.6
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2
          }}
        />
      ))}

      {/* 3D Cartoon Stars */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          style={{
            position: 'absolute',
            fontSize: '14px',
            color: '#f59e0b',
            left: `${5 + (i * 8)}%`,
            top: `${10 + Math.cos(i) * 40}%`,
            zIndex: 1
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        >
          ⭐
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          <Box sx={{ textAlign: 'center', mb: 8, position: 'relative' }}>
            {/* 3D Cartoon Character */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [-2, 2, -2],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                fontSize: '80px',
                marginBottom: '20px',
                filter: 'drop-shadow(0 10px 20px rgba(74, 222, 128, 0.3))'
              }}
            >
              🎵
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <AutoAwesome sx={{ 
                fontSize: 50, 
                color: '#4ade80', 
                mb: 3,
                animation: 'pulse 2s infinite',
                filter: 'drop-shadow(0 5px 15px rgba(74, 222, 128, 0.4))'
              }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <Typography 
                variant="h3" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 400,
                  fontSize: { xs: '2rem', md: '3rem', lg: '3.5rem' },
                  background: 'linear-gradient(45deg, #ffffff 20%, #4ade80 50%, #3b82f6 80%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 30px rgba(74, 222, 128, 0.3)',
                  letterSpacing: '1px',
                  mb: 2
                }}
              >
                Ready to Transform Your Audio?
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontWeight: 300,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Experience professional-grade audio processing with our AI-powered tools
              </Typography>
            </motion.div>

            {/* Floating Musical Notes */}
            {['🎼', '🎹', '🎸', '🎤', '🥁'].map((emoji, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  fontSize: '24px',
                  left: `${20 + i * 15}%`,
                  top: `${10 + Math.sin(i) * 20}%`,
                  zIndex: 0
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              >
                {emoji}
              </motion.div>
            ))}

            <Stars sx={{ 
              position: 'absolute', 
              top: -20, 
              right: '25%', 
              color: '#f59e0b',
              fontSize: 28,
              animation: 'sparkle 2s ease-in-out infinite',
              filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.5))'
            }} />
            
            <Stars sx={{ 
              position: 'absolute', 
              bottom: 20, 
              left: '20%', 
              color: '#8b5cf6',
              fontSize: 20,
              animation: 'sparkle 1.8s ease-in-out infinite',
              animationDelay: '0.5s',
              filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))'
            }} />
          </Box>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          {prefooterItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Grid item xs={12} sm={6} md={4} key={item.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    rotateY: 5,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <Paper
                    component={Link}
                    to={item.link}
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      backgroundColor: 'rgba(45, 55, 72, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(55, 65, 82, 0.8)',
                        border: `1px solid ${item.color}`,
                      }
                    }}
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.1,
                        rotateY: 15,
                        rotateX: 5
                      }}
                      transition={{ type: "spring", stiffness: 400 }}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '20px',
                        background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}80 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px auto',
                        boxShadow: `0 12px 30px ${item.color}40, 0 0 20px ${item.color}20`,
                        position: 'relative'
                      }}
                    >
                      <Icon sx={{ fontSize: 36, color: 'white', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
                      
                      {/* Rotating ring */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        style={{
                          position: 'absolute',
                          width: '90px',
                          height: '90px',
                          border: `2px solid ${item.color}30`,
                          borderTop: `2px solid ${item.color}`,
                          borderRadius: '50%',
                          top: -5,
                          left: -5
                        }}
                      />
                    </motion.div>
                    
                    <Typography 
                      variant="h6" 
                      sx={{ color: 'white', fontWeight: 600, mb: 1 }}
                    >
                      {item.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}
                    >
                      {item.description}
                    </Typography>

                    <Button
                      variant="outlined"
                      sx={{
                        color: item.color,
                        borderColor: item.color,
                        '&:hover': {
                          backgroundColor: item.color,
                          color: 'white',
                          borderColor: item.color,
                        }
                      }}
                    >
                      Learn More →
                    </Button>
                  </Paper>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={Link}
            to="/tools"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#4ade80',
              color: 'white',
              fontWeight: 600,
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              borderRadius: '25px',
              '&:hover': {
                backgroundColor: '#22c55e',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Explore All Tools
          </Button>
        </Box>
      </motion.div>
    </Box>
  )
}

export default Prefooter