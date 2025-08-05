import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Music, Volume2, Zap, FileAudio, Scissors, RotateCcw, ArrowRight, Code, Play } from 'lucide-react'

const tools = [
  {
    title: 'Vocal Remover',
    description: 'AI-powered vocal separation using advanced center channel extraction',
    icon: Volume2,
    href: '/vocal-remover',
    gradient: 'bg-vocal-remover',
    status: 'available'
  },
  {
    title: 'Pitch & Tempo',
    description: 'Independent pitch and tempo adjustment with real-time controls',
    icon: Zap,
    href: '/pitch-tempo',
    gradient: 'bg-pitch-tempo',
    status: 'coming-soon'
  },
  {
    title: 'Format Converter',
    description: 'Support for all major audio formats with quality options',
    icon: FileAudio,
    href: '/converter',
    gradient: 'bg-format-converter',
    status: 'coming-soon'
  },
  {
    title: 'Audio Editor',
    description: 'Cut and join audio files with visual waveform editing',
    icon: Scissors,
    href: '/editor',
    gradient: 'bg-audio-editor',
    status: 'coming-soon'
  },
  {
    title: 'Noise Reduction',
    description: 'Advanced noise removal with adjustable strength settings',
    icon: RotateCcw,
    href: '/noise-reduction',
    gradient: 'bg-noise-reduction',
    status: 'coming-soon'
  },
  {
    title: 'API Access',
    description: 'Full REST API for developers and integrations',
    icon: Code,
    href: '/docs',
    gradient: 'bg-api-access',
    status: 'available'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl mb-6">
              <Music className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Professional Audio Processing
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your audio with AI-powered tools. Remove vocals, adjust pitch and tempo, 
              convert formats, edit audio, and reduce noise with professional quality results.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Powerful Audio Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for professional audio processing in one platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 glass">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tool.gradient} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{tool.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link to={tool.href}>
                        <Button 
                          variant="outline" 
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                        >
                          Try Now
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Why Choose AudioStudio?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Fast Processing</h3>
                <p className="text-muted-foreground">
                  Lightning-fast audio processing with optimized algorithms
                </p>
              </div>
              <div className="glass p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">High Quality</h3>
                <p className="text-muted-foreground">
                  Professional-grade results with minimal quality loss
                </p>
              </div>
              <div className="glass p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
                <p className="text-muted-foreground">
                  Intuitive interface designed for both beginners and pros
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}