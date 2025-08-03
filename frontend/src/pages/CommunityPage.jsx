import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Grid,
  Button,
  Avatar,
  Rating
} from '@mui/material'
import {
  GitHub,
  Chat,
  Reddit,
  Twitter,
  People,
  Star,
  Forum,
  Code
} from '@mui/icons-material'

const communityStats = [
  { label: 'Active Users', value: '50K+', icon: People, color: '#3b82f6' },
  { label: 'GitHub Stars', value: '1.2K', icon: Star, color: '#f59e0b' },
  { label: 'Forum Posts', value: '5K+', icon: Forum, color: '#10b981' },
  { label: 'Contributors', value: '150+', icon: Code, color: '#8b5cf6' }
]

const communityLinks = [
  {
    name: 'Discord',
    description: 'Join our Discord server for real-time discussions and support',
    icon: Chat,
    color: '#5865f2',
    url: 'https://discord.gg/odoremover',
    members: '12K members'
  },
  {
    name: 'GitHub',
    description: 'Contribute to the project and report issues',
    icon: GitHub,
    color: '#333',
    url: 'https://github.com/odoremover',
    members: '1.2K stars'
  },
  {
    name: 'Reddit',
    description: 'Share creations and get feedback from the community',
    icon: Reddit,
    color: '#ff4500',
    url: 'https://reddit.com/r/odoremover',
    members: '8K members'
  },
  {
    name: 'Twitter',
    description: 'Follow us for updates and feature announcements',
    icon: Twitter,
    color: '#1da1f2',
    url: 'https://twitter.com/odoremover',
    members: '25K followers'
  }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Music Producer',
    content: 'The community has been incredibly helpful in improving my workflow. Love the collaborative spirit!',
    avatar: 'SJ',
    rating: 5
  },
  {
    name: 'Mike Chen',
    role: 'Podcast Creator',
    content: 'Amazing community with quick responses to questions. The Discord server is particularly active.',
    avatar: 'MC',
    rating: 5
  },
  {
    name: 'Emma Davis',
    role: 'Content Creator',
    content: 'Found so many creative ideas and solutions here. The community truly makes this platform special.',
    avatar: 'ED',
    rating: 5
  }
]

function CommunityPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Join Our Community
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Connect with creators, developers, and audio enthusiasts from around the world
          </Typography>
        </Box>

        {/* Community Stats */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {communityStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Grid item xs={6} md={3} key={stat.label}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      borderRadius: '20px',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 8px 25px ${stat.color}30`,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          backgroundColor: stat.color,
                          mx: 'auto',
                          mb: 2
                        }}
                      >
                        <Icon sx={{ fontSize: 30 }} />
                      </Avatar>
                      <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>

        {/* Community Platforms */}
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, textAlign: 'center' }}>
          Where to Find Us
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {communityLinks.map((platform, index) => {
            const Icon = platform.icon
            return (
              <Grid item xs={12} md={6} key={platform.name}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                >
                  <Card
                    sx={{
                      borderRadius: '20px',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 15px 35px ${platform.color}30`,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Avatar
                          sx={{
                            width: 50,
                            height: 50,
                            backgroundColor: platform.color
                          }}
                        >
                          <Icon sx={{ fontSize: 24 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {platform.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {platform.members}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                        {platform.description}
                      </Typography>
                      <Button
                        component="a"
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        sx={{
                          backgroundColor: platform.color,
                          '&:hover': {
                            backgroundColor: platform.color,
                            opacity: 0.9
                          },
                          borderRadius: '12px'
                        }}
                      >
                        Join {platform.name}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>

        {/* Community Testimonials */}
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, textAlign: 'center' }}>
          What Our Community Says
        </Typography>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={testimonial.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    borderRadius: '20px',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                      "{testimonial.content}"
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
            Ready to Connect?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Join thousands of creators sharing knowledge, tips, and collaborating on amazing projects
          </Typography>
          <Button
            component="a"
            href="https://discord.gg/odoremover"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="large"
            startIcon={<Chat />}
            sx={{
              background: 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)',
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              borderRadius: '12px'
            }}
          >
            Join Discord Community
          </Button>
        </Box>
      </motion.div>
    </Container>
  )
}

export default CommunityPage