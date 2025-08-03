import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Music, Headphones, Settings, Volume2, Filter, Shield, 
  ArrowRight, Star, Users, Zap, Globe, Mail, Github, Twitter, 
  Menu, X, Home, Info, Phone, Sparkles, AudioWaveform, Play,
  Download, CheckCircle, Clock, Cpu, Lock, Award, Mic, BarChart3,
  Heart, TrendingUp, MousePointer, Layers
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { ThemeProvider } from './contexts/ThemeContext'
import { ThemeToggle } from './components/ui/theme-toggle'
import { VocalRemover } from './components/VocalRemover'
import { PitchTempo } from './components/PitchTempo'
import { FormatConverter } from './components/FormatConverter'
import { AudioCutter } from './components/AudioCutter'
import { NoiseReducer } from './components/NoiseReducer'
import { Toaster } from 'sonner'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="odoremover-theme">
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-secondary/20 rounded-full blur-2xl animate-pulse delay-2000" />
        </div>

        {/* Navigation Header */}
        <motion.nav 
          className={`fixed top-0 w-full z-50 transition-all duration-500 ${
            isScrolled 
              ? 'glass-effect border-b border-white/10' 
              : 'bg-transparent'
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              
              {/* Logo */}
              <motion.div 
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => scrollToSection('home')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-2xl group-hover:shadow-2xl group-hover:shadow-primary/50 transition-all duration-300">
                    <AudioWaveform className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
                </div>
                <span className="text-3xl font-black gradient-text tracking-tight">
                  ODOREMOVER
                </span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {[
                  { id: 'home', label: 'Home', icon: Home },
                  { id: 'tools', label: 'Tools', icon: Settings },
                  { id: 'features', label: 'Features', icon: Star },
                  { id: 'about', label: 'About', icon: Info }
                ].map((item) => (
                  <motion.button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                      activeSection === item.id 
                        ? 'bg-primary/20 text-primary shadow-lg shadow-primary/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Button 
                  className="hidden lg:flex btn-gradient text-white font-semibold px-6 py-3 rounded-2xl"
                  onClick={() => scrollToSection('tools')}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                {/* Mobile Menu Button */}
                <motion.button 
                  className="lg:hidden p-3 rounded-2xl bg-white/10 backdrop-blur-sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div 
                  className="lg:hidden py-6 border-t border-white/10"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col gap-2">
                    {[
                      { id: 'home', label: 'Home', icon: Home },
                      { id: 'tools', label: 'Tools', icon: Settings },
                      { id: 'features', label: 'Features', icon: Star },
                      { id: 'about', label: 'About', icon: Info }
                    ].map((item) => (
                      <motion.button 
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="flex items-center gap-3 px-6 py-4 rounded-2xl text-left hover:bg-white/5 transition-all duration-300"
                        whileHover={{ x: 10 }}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              className="text-center max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Main Heading */}
              <motion.div
                className="flex items-center justify-center mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative">
                  <motion.div 
                    className="p-6 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl pulse-glow"
                    animate={{ 
                      background: [
                        "linear-gradient(135deg, #8b5cf6 0%, #06d6a0 100%)",
                        "linear-gradient(135deg, #06d6a0 0%, #8b5cf6 100%)",
                        "linear-gradient(135deg, #8b5cf6 0%, #06d6a0 100%)"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <AudioWaveform className="h-16 w-16 text-white" />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-6xl lg:text-8xl font-black mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="gradient-text">ODOREMOVER</span>
                <br />
                <span className="text-3xl lg:text-5xl font-bold text-muted-foreground">
                  Pro Audio Suite
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Transform your audio with cutting-edge AI technology. Remove vocals, adjust pitch & tempo, 
                convert formats, edit segments, and reduce noise with studio-quality results in seconds.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button 
                  size="lg" 
                  className="btn-gradient text-white font-bold px-10 py-6 text-lg rounded-2xl shadow-2xl shadow-primary/30"
                  onClick={() => scrollToSection('tools')}
                >
                  <Play className="mr-3 h-6 w-6" />
                  Start Processing
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-10 py-6 text-lg font-semibold rounded-2xl border-2 border-primary/30 hover:border-primary/60 glass-effect"
                  onClick={() => scrollToSection('features')}
                >
                  <Sparkles className="mr-3 h-6 w-6" />
                  Explore Features
                </Button>
              </motion.div>

              {/* Stats Section */}
              <motion.div 
                className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {[
                  { number: "500K+", label: "Files Processed", icon: BarChart3 },
                  { number: "99.9%", label: "Uptime", icon: CheckCircle },
                  { number: "< 30s", label: "Processing Time", icon: Clock },
                  { number: "5★", label: "User Rating", icon: Star }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center professional-card p-6 rounded-3xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-black gradient-text mb-2">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl lg:text-6xl font-black mb-6">
                <span className="gradient-text">Why Choose</span> ODOREMOVER?
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Industry-leading AI technology meets intuitive design for professional audio processing
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Process audio files in seconds with our optimized AI algorithms and cloud infrastructure",
                  gradient: "from-yellow-400 to-orange-500"
                },
                {
                  icon: Shield,
                  title: "Secure & Private",
                  description: "Your files are encrypted during processing and automatically deleted after completion",
                  gradient: "from-green-400 to-blue-500"
                },
                {
                  icon: Award,
                  title: "Studio Quality",
                  description: "Professional-grade results that rival expensive desktop software and hardware",
                  gradient: "from-purple-400 to-pink-500"
                },
                {
                  icon: Globe,
                  title: "Always Available",
                  description: "Cloud-based processing accessible from anywhere, on any device, anytime",
                  gradient: "from-blue-400 to-purple-500"
                },
                {
                  icon: Cpu,
                  title: "AI Powered",
                  description: "Advanced machine learning models trained on millions of audio samples",
                  gradient: "from-cyan-400 to-blue-500"
                },
                {
                  icon: Heart,
                  title: "User Friendly",
                  description: "Intuitive interface designed for both beginners and professional audio engineers",
                  gradient: "from-pink-400 to-red-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="h-full professional-card p-8 text-center border-0 group-hover:shadow-2xl transition-all duration-500">
                    <CardContent className="p-0">
                      <div className={`p-4 bg-gradient-to-r ${feature.gradient} rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <feature.icon className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Audio Tools Section */}
        <section id="tools" className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl lg:text-6xl font-black mb-6">
                <span className="gradient-text">Professional</span> Audio Tools
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Choose from our comprehensive suite of AI-powered audio processing tools designed for creators and professionals
              </p>
            </motion.div>

            <motion.div
              className="w-full max-w-7xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Tabs defaultValue="vocal-remover" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-12 h-20 p-3 glass-effect rounded-3xl border border-white/10">
                  <TabsTrigger 
                    value="vocal-remover" 
                    className="flex items-center gap-3 text-base font-semibold h-14 rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
                  >
                    <Headphones className="h-5 w-5" />
                    <span className="hidden sm:inline">Vocal Remover</span>
                    <span className="sm:hidden">Vocals</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pitch-tempo" 
                    className="flex items-center gap-3 text-base font-semibold h-14 rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="hidden sm:inline">Pitch & Tempo</span>
                    <span className="sm:hidden">Pitch</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="converter" 
                    className="flex items-center gap-3 text-base font-semibold h-14 rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
                  >
                    <Volume2 className="h-5 w-5" />
                    <span className="hidden sm:inline">Format Converter</span>
                    <span className="sm:hidden">Convert</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="cutter" 
                    className="flex items-center gap-3 text-base font-semibold h-14 rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
                  >
                    <Filter className="h-5 w-5" />
                    <span className="hidden sm:inline">Cut & Join</span>
                    <span className="sm:hidden">Edit</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="noise-reducer" 
                    className="flex items-center gap-3 text-base font-semibold h-14 rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
                  >
                    <Shield className="h-5 w-5" />
                    <span className="hidden sm:inline">Noise Reducer</span>
                    <span className="sm:hidden">Noise</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="vocal-remover" className="mt-8">
                  <VocalRemover />
                </TabsContent>

                <TabsContent value="pitch-tempo" className="mt-8">
                  <PitchTempo />
                </TabsContent>

                <TabsContent value="converter" className="mt-8">
                  <FormatConverter />
                </TabsContent>

                <TabsContent value="cutter" className="mt-8">
                  <AudioCutter />
                </TabsContent>

                <TabsContent value="noise-reducer" className="mt-8">
                  <NoiseReducer />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl lg:text-6xl font-black mb-8">
                  <span className="gradient-text">About</span> ODOREMOVER
                </h2>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-12">
                  We're passionate about making professional audio processing accessible to everyone. 
                  Our AI-powered tools deliver studio-quality results without the complexity or cost 
                  of traditional audio software.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {[
                    { icon: Users, title: "500K+ Users", desc: "Trusted by creators worldwide" },
                    { icon: Download, title: "10M+ Downloads", desc: "Files processed successfully" },
                    { icon: TrendingUp, title: "99.9% Uptime", desc: "Reliable cloud infrastructure" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="professional-card p-8 rounded-3xl text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{stat.title}</h3>
                      <p className="text-muted-foreground">{stat.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-white/10 glass-effect">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-2xl">
                    <AudioWaveform className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-2xl font-black gradient-text">ODOREMOVER</span>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                  Professional AI-powered audio processing suite designed for creators, musicians, and audio professionals worldwide.
                </p>
                <div className="flex gap-4">
                  {[Github, Twitter, Mail].map((Icon, index) => (
                    <motion.button
                      key={index}
                      className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className="font-bold mb-4">Tools</h3>
                <div className="space-y-3">
                  {['Vocal Remover', 'Pitch & Tempo', 'Format Converter', 'Audio Cutter', 'Noise Reducer'].map((tool) => (
                    <div key={tool} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {tool}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <div className="space-y-3">
                  {['About Us', 'Privacy Policy', 'Terms of Service', 'Support', 'Contact'].map((link) => (
                    <div key={link} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {link}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 mt-12 pt-8 text-center text-muted-foreground">
              <p>&copy; 2024 ODOREMOVER. All rights reserved. Built with ❤️ for audio creators.</p>
            </div>
          </div>
        </footer>

        <Toaster 
          position="top-center" 
          richColors 
          toastOptions={{
            style: {
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
            },
          }}
        />
      </div>
    </ThemeProvider>
  )
}

export default App