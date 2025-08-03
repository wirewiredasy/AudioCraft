import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Music, Headphones, Settings, Volume2, Filter, Shield, 
  ArrowRight, Star, Users, Zap, Globe, Mail, Github, Twitter, 
  Menu, X, Home, Info, Phone, Sparkles, AudioWaveform, Play,
  Download, CheckCircle, Clock, Cpu, Lock, Award, Mic, BarChart3
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

  // Wave animation component
  const WaveAnimation = () => (
    <motion.svg
      className="absolute bottom-0 left-0 w-full h-32 text-primary/20"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 3, ease: "easeInOut" }}
    >
      <motion.path
        d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
        fill="currentColor"
        animate={{
          d: [
            "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z",
            "M0,40 C300,80 900,20 1200,40 L1200,120 L0,120 Z",
            "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  )

  return (
    <ThemeProvider defaultTheme="dark" storageKey="odoremover-theme">
      <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] relative overflow-hidden">
        
        {/* Animated Background Particles */}
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Navigation Header */}
        <motion.nav 
          className={`fixed top-0 w-full z-50 transition-all duration-500 ${
            isScrolled 
              ? 'bg-[#0d1117]/80 backdrop-blur-xl border-b border-gray-800' 
              : 'bg-transparent'
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              
              {/* Logo */}
              <motion.div 
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => scrollToSection('home')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300">
                    <AudioWaveform className="h-8 w-8 text-white" />
                  </div>
                </div>
                <span className="text-2xl font-black text-white tracking-tight">
                  ODOREMOVER
                </span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'tools', label: 'Tools' },
                  { id: 'about', label: 'About' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <motion.button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                    whileHover={{ y: -2 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline"
                  className="hidden md:flex border-gray-700 text-gray-300 hover:bg-gray-800 px-6 py-2 rounded-full"
                >
                  Hotjig
                </Button>
                <Button 
                  className="hidden md:flex bg-gray-200 text-black hover:bg-white px-6 py-2 rounded-full font-semibold"
                  onClick={() => scrollToSection('tools')}
                >
                  Dood Mo
                </Button>
                <ThemeToggle />
                
                {/* Mobile Menu Button */}
                <motion.button 
                  className="lg:hidden p-3 rounded-xl bg-gray-800/50"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div 
                  className="lg:hidden py-6 border-t border-gray-800"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex flex-col gap-4">
                    {[
                      { id: 'home', label: 'Home' },
                      { id: 'tools', label: 'Tools' },
                      { id: 'about', label: 'About' },
                      { id: 'contact', label: 'Contact' }
                    ].map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 min-h-screen flex items-center">
          {/* Hero Background Wave */}
          <WaveAnimation />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Main Heading */}
              <motion.h1 
                className="text-6xl lg:text-8xl font-black mb-8 leading-tight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-white">Remove vocals.</span>
                <br />
                <span className="text-white">Change pitch.</span>
                <br />
                <span className="text-white">Convert formats.</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl lg:text-2xl text-gray-400 mb-12 leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Professional audio processing powered by AI. Transform your music with studio-quality results in seconds.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gray-200 text-black hover:bg-white font-bold px-12 py-6 text-xl rounded-full shadow-2xl"
                  onClick={() => scrollToSection('tools')}
                >
                  GET STARTED
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Audio Tools Grid */}
        <section id="tools" className="py-20 lg:py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-6xl font-black mb-6 text-white">
                Professional Audio Tools
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Choose from our comprehensive suite of AI-powered processing tools
              </p>
            </motion.div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  title: "Vocal Remover", 
                  description: "AI-powered vocal isolation and removal",
                  component: <VocalRemover />,
                  icon: Headphones,
                  color: "from-red-500 to-pink-500"
                },
                { 
                  title: "Pitch + Tempo", 
                  description: "Adjust pitch and tempo independently",
                  component: <PitchTempo />,
                  icon: Settings,
                  color: "from-blue-500 to-cyan-500"
                },
                { 
                  title: "Noise Reducer", 
                  description: "Clean up background noise and artifacts",
                  component: <NoiseReducer />,
                  icon: Shield,
                  color: "from-green-500 to-emerald-500"
                },
                { 
                  title: "Format Converter", 
                  description: "Convert between audio formats",
                  component: <FormatConverter />,
                  icon: Volume2,
                  color: "from-purple-500 to-violet-500"
                }
              ].map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <Card className="h-full bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm">
                    <CardContent className="p-8">
                      {/* Icon */}
                      <div className={`p-4 bg-gradient-to-r ${tool.color} rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <tool.icon className="h-8 w-8 text-white" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                        {tool.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {tool.description}
                      </p>
                      
                      {/* Audio Waveform Visualization */}
                      <div className="mb-6">
                        <div className="flex items-end gap-1 h-16 justify-center">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="bg-gradient-to-t from-gray-600 to-gray-400 rounded-full"
                              style={{
                                width: '3px',
                                height: `${Math.random() * 60 + 10}%`,
                              }}
                              animate={{
                                height: [
                                  `${Math.random() * 60 + 10}%`,
                                  `${Math.random() * 60 + 10}%`,
                                  `${Math.random() * 60 + 10}%`
                                ]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Slider Control */}
                      <div className="mb-6">
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          defaultValue="50"
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      
                      {/* Action Button */}
                      <Button 
                        className="w-full bg-gray-200 text-black hover:bg-white font-semibold py-3 rounded-full transition-all duration-300"
                      >
                        Doon Datter
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Advanced Tools Section */}
            <motion.div
              className="mt-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Tabs defaultValue="vocal-remover" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-12 h-16 p-2 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700">
                  <TabsTrigger 
                    value="vocal-remover" 
                    className="flex items-center gap-2 text-sm font-semibold h-12 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <Headphones className="h-4 w-4" />
                    Vocal Remover
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pitch-tempo" 
                    className="flex items-center gap-2 text-sm font-semibold h-12 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <Settings className="h-4 w-4" />
                    Pitch & Tempo
                  </TabsTrigger>
                  <TabsTrigger 
                    value="converter" 
                    className="flex items-center gap-2 text-sm font-semibold h-12 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <Volume2 className="h-4 w-4" />
                    Converter
                  </TabsTrigger>
                  <TabsTrigger 
                    value="cutter" 
                    className="flex items-center gap-2 text-sm font-semibold h-12 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <Filter className="h-4 w-4" />
                    Cut & Join
                  </TabsTrigger>
                  <TabsTrigger 
                    value="noise-reducer" 
                    className="flex items-center gap-2 text-sm font-semibold h-12 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <Shield className="h-4 w-4" />
                    Noise Reducer
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
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-6xl font-black mb-8 text-white">
                About ODOREMOVER
              </h2>
              <p className="text-xl lg:text-2xl text-gray-400 leading-relaxed mb-12 max-w-4xl mx-auto">
                We're passionate about making professional audio processing accessible to everyone. 
                Our AI-powered tools deliver studio-quality results without the complexity.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Users, title: "500K+ Users", desc: "Trusted by creators worldwide" },
                  { icon: Download, title: "10M+ Files", desc: "Successfully processed" },
                  { icon: CheckCircle, title: "99.9% Uptime", desc: "Reliable cloud infrastructure" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <stat.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2 text-white">{stat.title}</h3>
                    <p className="text-gray-400">{stat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 border-t border-gray-800 bg-gray-900/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    <AudioWaveform className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-2xl font-black text-white">ODOREMOVER</span>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                  Professional AI-powered audio processing suite for creators and musicians worldwide.
                </p>
                <div className="flex gap-4">
                  {[Github, Twitter, Mail].map((Icon, index) => (
                    <motion.button
                      key={index}
                      className="p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-6 w-6 text-gray-400" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-bold mb-4 text-white">Tools</h3>
                <div className="space-y-3">
                  {['Vocal Remover', 'Pitch & Tempo', 'Format Converter', 'Audio Cutter', 'Noise Reducer'].map((tool) => (
                    <div key={tool} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      {tool}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4 text-white">Company</h3>
                <div className="space-y-3">
                  {['About Us', 'Privacy Policy', 'Terms of Service', 'Support', 'Contact'].map((link) => (
                    <div key={link} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      {link}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 ODOREMOVER. All rights reserved. Built with ❤️ for audio creators.</p>
            </div>
          </div>
        </section>

        <Toaster 
          position="top-center" 
          richColors 
          toastOptions={{
            style: {
              background: 'rgba(0, 0, 0, 0.9)',
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