
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Box,
  Paper,
  Avatar,
  IconButton
} from '@mui/material'
import {
  Group,
  Forum,
  GitHub,
  Twitter,
  Discord,
  Reddit,
  Star,
  Favorite,
  Share,
  Comment
} from '@mui/icons-material'

const communityStats = [
  { number: '50K+', label: 'Community Members', icon: Group },
  { number: '10K+', label: 'GitHub Stars', icon: Star },
  { number: '500+', label: 'Discord Users', icon: Discord },
  { number: '1M+', label: 'Files Processed', icon: Share }
]

const featuredPosts = [
  {
    title: 'Amazing vocal separation on my track!',
    author: 'MusicProducer23',
    avatar: 'M',
    content: 'Just tried the new AI vocal remover and the results are incredible! The separation is so clean...',
    likes: 45,
    comments: 12,
    category: 'Success Story'
  },
  {
    title: 'Tips for better pitch shifting results',
    author: 'AudioEngineer',
    avatar: 'A',
    content: 'Here are some professional tips I\'ve learned for getting the best results with pitch adjustment...',
    likes: 32,
    comments: 8,
    category: 'Tutorial'
  },
  {
    title: 'Feature request: Batch processing',
    author: 'DevUser',
    avatar: 'D',
    content: 'Would love to see batch processing for multiple files. This would save so much time...',
    likes: 28,
    comments: 15,
    category: 'Feature Request'
  }
]

const platforms = [
  {
    name: 'Discord',
    description: 'Join our Discord server for real-time chat and support',
    icon: Discord,
    color: '#5865F2',
    members: '500+ members',
    action: 'Join Server'
  },
  {
    name: 'GitHub',
    description: 'Contribute to our open-source projects and report issues',
    icon: GitHub,
    color: '#333',
    members: '10K+ stars',
    action: 'View Repository'
  },
  {
    name: 'Reddit',
    description: 'Discuss audio processing techniques and share results',
    icon: Reddit,
    color: '#FF4500',
    members: '5K+ members',
    action: 'Join Community'
  },
  {
    name: 'Twitter',
    description: 'Follow us for updates, tips, and community highlights',
    icon: Twitter,
    color: '#1DA1F2',
    members: '15K+ followers',
    action: 'Follow Us'
  }
]

function CommunityPage() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a1d29 0%, #0f1419 50%, #000 100%)',
      pt: 4
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Group sx={{ fontSize: 60, color: '#4ade80', mb: 2 }} />
            <Typography 
              variant="h2" 
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 300,
                color: 'white',
                mb: 3
              }}
            >
              Join Our Community
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Connect with fellow audio enthusiasts, share your projects, get help, and contribute to the future of audio processing.
            </Typography>
          </Box>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {communityStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Grid item xs={6} md={3} key={index}>
                  <Paper sx={{
                    backgroundColor: 'rgba(45, 55, 72, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    p: 4,
                    textAlign: 'center'
                  }}>
                    <Icon sx={{ fontSize: 40, color: '#4ade80', mb: 2 }} />
                    <Typography variant="h4" sx={{ 
                      color: 'white', 
                      fontWeight: 700,
                      fontSize: { xs: '1.5rem', md: '2rem' }
                    }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </motion.div>

        {/* Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', mb: 6 }}>
            Connect With Us
          </Typography>
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {platforms.map((platform, index) => {
              const Icon = platform.icon
              return (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Paper sx={{
                      backgroundColor: 'rgba(45, 55, 72, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      p: 4,
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        backgroundColor: 'rgba(55, 65, 82, 0.9)',
                        border: `1px solid ${platform.color}`,
                      }
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Icon sx={{ fontSize: 40, color: platform.color, mr: 2 }} />
                        <Box>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                            {platform.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: platform.color }}>
                            {platform.members}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        mb: 3,
                        flex: 1
                      }}>
                        {platform.description}
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          backgroundColor: platform.color,
                          color: 'white',
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: platform.color,
                            filter: 'brightness(1.1)',
                          }
                        }}
                      >
                        {platform.action}
                      </Button>
                    </Paper>
                  </motion.div>
                </Grid>
              )
            })}
          </Grid>
        </motion.div>

        {/* Featured Community Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', mb: 6 }}>
            Community Highlights
          </Typography>
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {featuredPosts.map((post, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Paper sx={{
                    backgroundColor: 'rgba(45, 55, 72, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    p: 4,
                    height: '280px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ 
                        backgroundColor: '#4ade80', 
                        color: 'white', 
                        mr: 2,
                        width: 32,
                        height: 32,
                        fontSize: '0.875rem'
                      }}>
                        {post.avatar}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                          {post.author}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: '#4ade80',
                          backgroundColor: 'rgba(74, 222, 128, 0.2)',
                          px: 1,
                          py: 0.25,
                          borderRadius: '4px'
                        }}>
                          {post.category}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                      {post.title}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      mb: 3,
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {post.content}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IconButton size="small" sx={{ color: '#ef4444' }}>
                          <Favorite fontSize="small" />
                        </IconButton>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {post.likes}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IconButton size="small" sx={{ color: '#3b82f6' }}>
                          <Comment fontSize="small" />
                        </IconButton>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {post.comments}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Paper sx={{
            backgroundColor: 'rgba(74, 222, 128, 0.1)',
            border: '1px solid rgba(74, 222, 128, 0.3)',
            borderRadius: '24px',
            p: 6,
            textAlign: 'center'
          }}>
            <Forum sx={{ fontSize: 50, color: '#4ade80', mb: 2 }} />
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              Ready to Join Our Community?
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4 }}>
              Connect with thousands of audio enthusiasts, share your projects, get expert advice, 
              and help shape the future of audio processing technology.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="contained"
                size="large"
                startIcon={<Discord />}
                sx={{
                  backgroundColor: '#5865F2',
                  color: 'white',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#4752C4',
                    transform: 'translateY(-1px)',
                  }
                }}
              >
                Join Discord
              </Button>
              <Button 
                variant="outlined"
                size="large"
                startIcon={<GitHub />}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-1px)',
                  }
                }}
              >
                View on GitHub
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  )
}

export default CommunityPage
