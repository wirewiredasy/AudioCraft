import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Music, Headphones, Settings, Volume2, Filter, Shield, 
  ArrowRight, Star, Users, Zap, Globe, Mail, Github, Twitter, 
  Menu, X, Home, Info, Phone
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

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="odoremover-theme">
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
        {/* Modern Navigation Header */}
        <motion.nav 
          className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => scrollToSection('home')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-2 bg-gradient-to-r from-primary to-primary/70 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  ODOREMOVER
                </span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <button 
                  onClick={() => scrollToSection('home')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    activeSection === 'home' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('tools')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    activeSection === 'tools' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  Tools
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    activeSection === 'about' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Info className="h-4 w-4" />
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    activeSection === 'contact' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Phone className="h-4 w-4" />
                  Contact
                </button>
              </div>

              {/* Theme Toggle & Mobile Menu */}
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button 
                  className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <motion.div 
                className="md:hidden py-4 border-t border-border/50"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-left hover:bg-muted transition-colors"
                  >
                    <Home className="h-4 w-4" />Home
                  </button>
                  <button 
                    onClick={() => scrollToSection('tools')}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-left hover:bg-muted transition-colors"
                  >
                    <Settings className="h-4 w-4" />Tools
                  </button>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-left hover:bg-muted transition-colors"
                  >
                    <Info className="h-4 w-4" />About
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-left hover:bg-muted transition-colors"
                  >
                    <Phone className="h-4 w-4" />Contact
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="text-center max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="flex items-center justify-center mb-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="p-4 bg-gradient-to-r from-primary to-primary/70 rounded-2xl mr-4">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  ODOREMOVER
                </h1>
              </motion.div>
              
              <motion.p 
                className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Professional AI-Powered Audio Processing Suite
              </motion.p>
              
              <motion.p 
                className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Transform your audio files with cutting-edge AI technology. Remove vocals, adjust pitch & tempo, 
                convert formats, edit segments, and reduce noise - all with studio-quality results in seconds.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button 
                  size="lg" 
                  className="px-8 py-6 text-lg font-medium"
                  onClick={() => scrollToSection('tools')}
                >
                  Start Processing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-6 text-lg font-medium"
                  onClick={() => scrollToSection('about')}
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Why Choose ODOREMOVER?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Industry-leading AI technology meets user-friendly design
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Process audio files in seconds with our optimized AI algorithms"
                },
                {
                  icon: Shield,
                  title: "Secure & Private",
                  description: "Your files are processed securely and deleted after completion"
                },
                {
                  icon: Star,
                  title: "Studio Quality",
                  description: "Professional-grade results that rival expensive software"
                },
                {
                  icon: Globe,
                  title: "Always Available",
                  description: "Cloud-based processing accessible from anywhere, anytime"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Audio Tools Section */}
        <section id="tools" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Professional Audio Tools</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose from our comprehensive suite of AI-powered audio processing tools
              </p>
            </motion.div>

            <motion.div
              className="w-full max-w-7xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Tabs defaultValue="vocal-remover" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-12 h-16 p-2 bg-muted/50 backdrop-blur-sm rounded-2xl">
                  <TabsTrigger value="vocal-remover" className="flex items-center gap-2 text-sm font-medium h-12 rounded-xl">
                    <Headphones className="h-4 w-4" />
                    <span className="hidden sm:inline">Vocal Remover</span>
                    <span className="sm:hidden">Vocals</span>
                  </TabsTrigger>
                  <TabsTrigger value="pitch-tempo" className="flex items-center gap-2 text-sm font-medium h-12 rounded-xl">
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Pitch & Tempo</span>
                    <span className="sm:hidden">Pitch</span>
                  </TabsTrigger>
                  <TabsTrigger value="converter" className="flex items-center gap-2 text-sm font-medium h-12 rounded-xl">
                    <Volume2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Format Converter</span>
                    <span className="sm:hidden">Convert</span>
                  </TabsTrigger>
                  <TabsTrigger value="cutter" className="flex items-center gap-2 text-sm font-medium h-12 rounded-xl">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Cut & Join</span>
                    <span className="sm:hidden">Edit</span>
                  </TabsTrigger>
                  <TabsTrigger value="noise-reducer" className="flex items-center gap-2 text-sm font-medium h-12 rounded-xl">
                    <Shield className="h-4 w-4" />
                    <span className="hidden sm:inline">Noise Reducer</span>
                    <span className="sm:hidden">Noise</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="vocal-remover">
                  <VocalRemover />
                </TabsContent>

                <TabsContent value="pitch-tempo">
                  <PitchTempo />
                </TabsContent>

                <TabsContent value="converter">
                  <FormatConverter />
                </TabsContent>

                <TabsContent value="cutter">
                  <AudioCutter />
                </TabsContent>

                <TabsContent value="noise-reducer">
                  <NoiseReducer />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6">About ODOREMOVER</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  ODOREMOVER is a cutting-edge audio processing platform that harnesses the power of artificial intelligence 
                  to deliver professional-grade audio editing capabilities directly in your browser.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Built with a microservices architecture using FastAPI and powered by industry-standard libraries like 
                  Spleeter, Librosa, and advanced AI models, our platform ensures high-quality results every time.
                </p>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">1M+</div>
                    <div className="text-sm text-muted-foreground">Files Processed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">&lt; 30s</div>
                    <div className="text-sm text-muted-foreground">Avg Processing</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {[
                  {
                    icon: Shield,
                    title: "AI-Powered",
                    description: "Cutting-edge machine learning algorithms for superior audio processing"
                  },
                  {
                    icon: Zap,
                    title: "Real-time Processing",
                    description: "Lightning-fast processing with immediate results and feedback"
                  },
                  {
                    icon: Users,
                    title: "User-Friendly",
                    description: "Intuitive interface designed for both beginners and professionals"
                  },
                  {
                    icon: Globe,
                    title: "Cloud-Based",
                    description: "Access your tools from anywhere with our scalable cloud infrastructure"
                  }
                ].map((item, index) => (
                  <Card key={index} className="p-6 text-center group hover:shadow-lg transition-all duration-300">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-xl text-muted-foreground mb-12">
                Have questions about our audio processing tools? We'd love to hear from you.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="p-6 text-center group hover:shadow-lg transition-all duration-300">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-muted-foreground">support@odoremover.com</p>
                </Card>
                
                <Card className="p-6 text-center group hover:shadow-lg transition-all duration-300">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Github className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Open Source</h3>
                  <p className="text-muted-foreground">Contribute on GitHub</p>
                </Card>
                
                <Card className="p-6 text-center group hover:shadow-lg transition-all duration-300">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Twitter className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Follow Us</h3>
                  <p className="text-muted-foreground">@odoremover</p>
                </Card>
              </div>
              
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg font-medium"
                onClick={() => scrollToSection('tools')}
              >
                Try Our Tools Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Professional Footer */}
        <footer className="bg-muted/50 border-t border-border/50">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-primary to-primary/70 rounded-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    ODOREMOVER
                  </span>
                </div>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Professional AI-powered audio processing tools designed for creators, musicians, and audio professionals worldwide.
                </p>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection('tools')}
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Audio Tools
                  </button>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </button>
                </div>
              </div>
              
              {/* Tools */}
              <div>
                <h3 className="font-semibold mb-4">Tools</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Vocal Remover</p>
                  <p className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Pitch & Tempo</p>
                  <p className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Format Converter</p>
                  <p className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Audio Cutter</p>
                  <p className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Noise Reducer</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <div className="h-1 w-8 bg-gradient-to-r from-primary/50 to-transparent rounded"></div>
                <Shield className="h-4 w-4 text-primary/70" />
                <div className="h-1 w-8 bg-gradient-to-l from-primary/50 to-transparent rounded"></div>
              </div>
              <p className="text-sm text-muted-foreground text-center md:text-right">
                © 2024 ODOREMOVER. Built with FastAPI microservices architecture.<br />
                All processing happens securely on our servers.
              </p>
            </div>
          </div>
        </footer>
        
        <Toaster 
          theme="light" 
          position="top-right"
          expand={false}
          richColors
          closeButton
        />
      </div>
    </ThemeProvider>
  )
}

export default App