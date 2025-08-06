
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, VolumeX, Music, Volume2, Settings, Mic, Scissors, Star, Zap, Shield } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <VolumeX className="w-8 h-8" />,
      title: "Vocal Remover",
      description: "Remove vocals from any song using AI-powered separation technology",
      href: "/vocal-remover",
      color: "from-red-600 to-red-700"
    },
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: "Pitch & Tempo",
      description: "Adjust pitch and tempo of audio files while maintaining quality",
      href: "/pitch-tempo",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Format Converter",
      description: "Convert between different audio formats seamlessly",
      href: "/converter",
      color: "from-green-600 to-green-700"
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Audio Editor",
      description: "Cut, trim, and edit your audio files with precision",
      href: "/editor",
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Noise Reduction",
      description: "Remove background noise and enhance audio clarity",
      href: "/noise-reduction",
      color: "from-yellow-600 to-yellow-700"
    }
  ]

  const stats = [
    { number: "10K+", label: "Songs Processed" },
    { number: "99%", label: "Success Rate" },
    { number: "5 Min", label: "Average Time" },
    { number: "50+", label: "Audio Formats" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              AI-Powered Audio Processing
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Professional
              <span className="block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                ODOREMOVER
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
              Transform your audio with cutting-edge AI technology. Remove vocals, adjust tempo, 
              convert formats, and enhance your music like never before.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/vocal-remover"
                className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                <VolumeX className="w-5 h-5 mr-2 inline" />
                Start Processing
                <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="#features"
                className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                View Features
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-700/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Audio Tools
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to process, edit, and enhance your audio files with professional quality results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link
                  to={feature.href}
                  className="group block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-red-400 font-semibold group-hover:text-red-300">
                    <span>Try it now</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose ODOREMOVER?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the difference with our advanced AI-powered audio processing platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "Process your audio files in minutes, not hours. Our optimized AI algorithms deliver results quickly."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Secure & Private",
                description: "Your files are processed securely and deleted after processing. We respect your privacy."
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Professional Quality",
                description: "Industry-grade audio processing that maintains the highest quality standards."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
