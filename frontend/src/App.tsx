import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Music, Headphones, Settings, Volume2, Filter, Shield, 
  ArrowRight, Star, Users, Zap, Globe, Mail, Github, Twitter, 
  Menu, X, Home, Info, Phone, Sparkles, AudioWaveform, Play,
  Download, CheckCircle, Clock, Cpu, Lock, Award, Mic, BarChart3,
  Upload, FileAudio, Waves, Layers, Palette, MonitorSpeaker
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  // 3D Floating Orbs Component
  const FloatingOrbs = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            background: `linear-gradient(135deg, 
              ${i % 4 === 0 ? '#ff6b6b, #4ecdc4' : 
                i % 4 === 1 ? '#a8e6cf, #dcedc1' : 
                i % 4 === 2 ? '#ffd93d, #6bcf7f' : 
                '#4ecdc4, #45b7d1'})`,
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, Math.random() * 400 - 200, 0],
            y: [0, Math.random() * 400 - 200, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )

  // Animated Background Grid
  const AnimatedGrid = () => (
    <div className="fixed inset-0 pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <motion.path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              animate={{ strokeOpacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )

  // Cursor Trail Effect
  const CursorTrail = () => (
    <motion.div
      className="fixed w-6 h-6 pointer-events-none z-50 rounded-full mix-blend-difference"
      style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
    />
  )

  // Enhanced Wave Animation
  const MegaWaveAnimation = () => (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute bottom-0 w-full h-96" viewBox="0 0 1200 320" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#4ecdc4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#45b7d1" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a8e6cf" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#ffd93d" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6bcf7f" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M0,160 C300,220 600,100 1200,180 L1200,320 L0,320 Z"
          fill="url(#waveGradient1)"
          animate={{
            d: [
              "M0,160 C300,220 600,100 1200,180 L1200,320 L0,320 Z",
              "M0,180 C300,120 600,200 1200,140 L1200,320 L0,320 Z",
              "M0,160 C300,220 600,100 1200,180 L1200,320 L0,320 Z"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.path
          d="M0,200 C400,140 800,240 1200,200 L1200,320 L0,320 Z"
          fill="url(#waveGradient2)"
          animate={{
            d: [
              "M0,200 C400,140 800,240 1200,200 L1200,320 L0,320 Z",
              "M0,220 C400,180 800,160 1200,220 L1200,320 L0,320 Z",
              "M0,200 C400,140 800,240 1200,200 L1200,320 L0,320 Z"
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>
    </div>
  )

  return (
    <ThemeProvider defaultTheme="dark" storageKey="odoremover-theme">
      <div ref={containerRef} className="min-h-screen text-white relative overflow-hidden">
        
        {/* Floating Orbs Background */}
        <FloatingOrbs />
        
        {/* Animated Grid */}
        <AnimatedGrid />
        
        {/* Cursor Trail */}
        <CursorTrail />

        {/* Ultra Modern Navigation */}
        <motion.nav 
          className="fixed top-0 w-full z-50 neo-glass neon-glow"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              
              {/* 3D Logo */}
              <motion.div 
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => scrollToSection('home')}
                whileHover={{ scale: 1.1, rotateY: 15 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative">
                  <motion.div 
                    className="p-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl shadow-2xl group-hover:shadow-purple-500/50"
                    animate={{ 
                      rotateX: [0, 10, 0],
                      rotateY: [0, -10, 0],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <AudioWaveform className="h-10 w-10 text-white" />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <motion.span 
                    className="text-3xl font-black holographic-text"
                  >
                    ODOREMOVER
                  </motion.span>
                  <div className="text-xs text-purple-300 font-semibold">AI Audio Studio</div>
                </div>
              </motion.div>

              {/* Futuristic Navigation */}
              <div className="hidden lg:flex items-center gap-2">
                {[
                  { id: 'home', label: 'Home', icon: Home },
                  { id: 'tools', label: 'Studio', icon: Settings },
                  { id: 'features', label: 'Features', icon: Star },
                  { id: 'about', label: 'About', icon: Info }
                ].map((item, index) => (
                  <motion.button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-500 magnetic-btn ${
                      activeSection === item.id 
                        ? 'rainbow-border text-white shadow-lg energy-pulse' 
                        : 'text-purple-200 hover:text-white hover:bg-white/10 neo-glass'
                    }`}
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ y: 0, scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl"
                        layoutId="activeSection"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline"
                    className="hidden md:flex neo-glass neon-glow text-white px-6 py-2 rounded-full magnetic-btn hologram-effect"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Pro Mode
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    className="hidden md:flex rainbow-border text-white px-6 py-2 rounded-full font-semibold neon-glow magnetic-btn energy-pulse"
                    onClick={() => scrollToSection('tools')}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Launch Studio
                  </Button>
                </motion.div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Mega Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center">
          {/* Dynamic Background */}
          <MegaWaveAnimation />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              {/* Floating Icon Above Title */}
              <motion.div
                className="flex justify-center mb-12"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <motion.div 
                  className="relative"
                  animate={{ 
                    rotateY: [0, 360],
                    rotateX: [0, 15, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="p-8 bg-gradient-to-br from-pink-500 via-purple-500 via-blue-500 to-cyan-500 rounded-3xl shadow-2xl backdrop-blur-sm">
                    <AudioWaveform className="h-20 w-20 text-white" />
                  </div>
                  <motion.div 
                    className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl opacity-30 blur-xl"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>

              {/* Epic Title */}
              <motion.h1 
                className="text-7xl lg:text-9xl font-black mb-8 leading-tight"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <motion.span 
                  className="holographic-text floating-3d"
                >
                  AUDIO
                </motion.span>
                <br />
                <motion.span 
                  className="gradient-text-animated floating-3d"
                  style={{ animationDelay: '0.5s' }}
                >
                  REVOLUTION
                </motion.span>
              </motion.h1>
              
              {/* Animated Subtitle */}
              <motion.p 
                className="text-2xl lg:text-3xl text-purple-200 mb-12 leading-relaxed max-w-5xl mx-auto font-light"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                🎵 Transform • Enhance • Create • Innovate 🎵
                <br />
                <span className="text-lg text-purple-300">
                  The ultimate AI-powered audio processing suite that brings studio magic to your fingertips
                </span>
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="rainbow-border text-white font-bold px-12 py-6 text-xl rounded-full neon-glow magnetic-btn energy-pulse"
                    onClick={() => scrollToSection('tools')}
                  >
                    <Zap className="mr-3 h-6 w-6" />
                    Start Creating Magic
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-12 py-6 text-xl font-semibold rounded-full neo-glass neon-glow text-white magnetic-btn hologram-effect"
                    onClick={() => scrollToSection('features')}
                  >
                    <Sparkles className="mr-3 h-6 w-6" />
                    Explore Features
                  </Button>
                </motion.div>
              </motion.div>

              {/* Floating Statistics */}
              <motion.div 
                className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                {[
                  { number: "1M+", label: "Audio Files Processed", icon: FileAudio, color: "from-pink-500 to-rose-500" },
                  { number: "99.9%", label: "Accuracy Rate", icon: CheckCircle, color: "from-purple-500 to-violet-500" },
                  { number: "< 5s", label: "Processing Time", icon: Clock, color: "from-blue-500 to-cyan-500" },
                  { number: "50+", label: "AI Models", icon: Cpu, color: "from-green-500 to-emerald-500" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                  >
                    <div className="neo-glass p-8 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 perspective-card">
                      <div className="card-inner">
                      <motion.div 
                        className={`p-3 bg-gradient-to-r ${stat.color} rounded-2xl w-fit mx-auto mb-4`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <stat.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <motion.div 
                        className="text-4xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-sm text-purple-300 font-medium">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Revolutionary Features Section */}
        <section id="features" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-6xl lg:text-7xl font-black mb-8"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <span className="gradient-text-animated floating-3d">
                  Revolutionary
                </span>
                <br />
                <span className="holographic-text floating-3d" style={{ animationDelay: '0.5s' }}>Features</span>
              </motion.h2>
              <p className="text-2xl text-purple-200 max-w-4xl mx-auto leading-relaxed">
                Experience the future of audio processing with our cutting-edge AI technology
              </p>
            </motion.div>
            
            {/* 3D Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  icon: Zap,
                  title: "Lightning AI Processing",
                  description: "Process your audio files in milliseconds with our quantum-enhanced AI algorithms",
                  gradient: "from-yellow-400 via-orange-500 to-red-500",
                  delay: 0
                },
                {
                  icon: Shield,
                  title: "Military-Grade Security",
                  description: "Your files are protected with AES-256 encryption and automatically deleted after processing",
                  gradient: "from-green-400 via-blue-500 to-purple-500",
                  delay: 0.1
                },
                {
                  icon: Award,
                  title: "Studio Quality Results",
                  description: "Professional-grade output that rivals the most expensive studio equipment",
                  gradient: "from-purple-400 via-pink-500 to-red-500",
                  delay: 0.2
                },
                {
                  icon: Globe,
                  title: "Global Cloud Network",
                  description: "Access from anywhere with our worldwide distributed processing infrastructure",
                  gradient: "from-blue-400 via-purple-500 to-pink-500",
                  delay: 0.3
                },
                {
                  icon: Cpu,
                  title: "Next-Gen AI Models",
                  description: "Powered by the latest machine learning breakthroughs and neural networks",
                  gradient: "from-cyan-400 via-blue-500 to-purple-500",
                  delay: 0.4
                },
                {
                  icon: Star,
                  title: "Intuitive Interface",
                  description: "Designed for everyone - from beginners to professional audio engineers",
                  gradient: "from-pink-400 via-red-500 to-orange-500",
                  delay: 0.5
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: feature.delay }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -20, 
                    rotateX: 5, 
                    rotateY: 5, 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="group perspective-1000"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative neo-glass rounded-3xl p-8 shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500 transform-gpu perspective-card">
                    <div className="card-inner">
                    {/* Animated Background Glow */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    
                    {/* 3D Icon */}
                    <motion.div 
                      className={`p-4 bg-gradient-to-r ${feature.gradient} rounded-2xl w-fit mb-6 shadow-lg group-hover:shadow-xl`}
                      whileHover={{ 
                        rotateY: 180,
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <feature.icon className="h-10 w-10 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-4 holographic-text group-hover:text-purple-200 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-purple-200 leading-relaxed">
                      {feature.description}
                    </p>
                    </div>
                    
                    {/* Floating particles */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/40 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Audio Tools Studio */}
        <section id="tools" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl lg:text-7xl font-black mb-8">
                <span className="holographic-text floating-3d">
                  Audio Studio
                </span>
              </h2>
              <p className="text-2xl text-purple-200 max-w-4xl mx-auto leading-relaxed">
                Professional-grade tools powered by artificial intelligence
              </p>
            </motion.div>

            {/* Enhanced Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Tabs defaultValue="vocal-remover" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-16 h-20 p-3 neo-glass neon-glow rounded-3xl">
                  {[
                    { value: "vocal-remover", label: "Vocal AI", icon: Headphones },
                    { value: "pitch-tempo", label: "Pitch Master", icon: Settings },
                    { value: "converter", label: "Format Pro", icon: Volume2 },
                    { value: "cutter", label: "Edit Suite", icon: Filter },
                    { value: "noise-reducer", label: "Clean AI", icon: Shield }
                  ].map((tab) => (
                    <TabsTrigger 
                      key={tab.value}
                      value={tab.value}
                      className="flex items-center gap-3 text-base font-semibold h-14 rounded-2xl data-[state=active]:rainbow-border data-[state=active]:text-white transition-all duration-300 data-[state=active]:energy-pulse magnetic-btn hologram-effect"
                    >
                      <tab.icon className="h-5 w-5" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}
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
        <section id="about" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl lg:text-7xl font-black mb-12">
                <span className="holographic-text floating-3d">
                  About ODOREMOVER
                </span>
              </h2>
              <p className="text-2xl lg:text-3xl text-purple-200 leading-relaxed mb-16 max-w-5xl mx-auto">
                We're revolutionizing audio processing with cutting-edge AI technology, 
                making professional-grade tools accessible to creators worldwide.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Users, title: "1M+ Creators", desc: "Trust our platform daily", color: "from-pink-500 to-red-500" },
                  { icon: Download, title: "50M+ Files", desc: "Successfully processed", color: "from-blue-500 to-purple-500" },
                  { icon: Award, title: "Industry Leader", desc: "In AI audio technology", color: "from-green-500 to-blue-500" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="neo-glass p-10 rounded-3xl shadow-xl perspective-card neon-glow"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <div className="card-inner">
                      <motion.div 
                        className={`p-4 bg-gradient-to-r ${stat.color} rounded-2xl w-fit mx-auto mb-6 energy-pulse`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <stat.icon className="h-12 w-12 text-white" />
                      </motion.div>
                      <h3 className="text-3xl font-bold mb-3 holographic-text">{stat.title}</h3>
                      <p className="text-purple-200 text-lg">{stat.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Epic Footer */}
        <footer className="py-20 border-t border-white/20 backdrop-blur-xl bg-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              
              {/* Brand Section */}
              <div className="md:col-span-2">
                <motion.div 
                  className="flex items-center gap-4 mb-8"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl">
                    <AudioWaveform className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <span className="text-3xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                      ODOREMOVER
                    </span>
                    <div className="text-sm text-purple-300">AI Audio Revolution</div>
                  </div>
                </motion.div>
                <p className="text-purple-200 leading-relaxed mb-8 max-w-md text-lg">
                  The world's most advanced AI-powered audio processing platform, 
                  trusted by millions of creators and professionals worldwide.
                </p>
                <div className="flex gap-4">
                  {[Github, Twitter, Mail].map((Icon, index) => (
                    <motion.button
                      key={index}
                      className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-6 w-6 text-purple-200" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-bold mb-6 text-white text-xl">AI Tools</h3>
                <div className="space-y-4">
                  {['Vocal AI Remover', 'Pitch Master Pro', 'Format Converter', 'Edit Suite Pro', 'Clean AI'].map((tool) => (
                    <motion.div 
                      key={tool} 
                      className="text-purple-200 hover:text-white transition-colors cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      {tool}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-6 text-white text-xl">Company</h3>
                <div className="space-y-4">
                  {['About Us', 'Privacy Policy', 'Terms of Service', 'AI Ethics', 'Contact'].map((link) => (
                    <motion.div 
                      key={link} 
                      className="text-purple-200 hover:text-white transition-colors cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            <motion.div 
              className="border-t border-white/20 mt-16 pt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-purple-300 text-lg">
                &copy; 2024 ODOREMOVER. All rights reserved. Powered by AI • Built with ❤️ for creators worldwide.
              </p>
            </motion.div>
          </div>
        </footer>

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