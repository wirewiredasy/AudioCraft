import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { Home, ArrowLeft, Music } from 'lucide-react'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - ODOREMOVER Audio Suite</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Head>

      <div className="min-h-screen">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* 404 Animation */}
            <div className="mb-12">
              <div className="w-32 h-32 mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full opacity-20 animate-pulse" />
                <div className="absolute inset-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full opacity-40 animate-pulse-slow" />
                <div className="absolute inset-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Music className="w-12 h-12 text-white animate-bounce-subtle" />
                </div>
              </div>
              
              <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
                404
              </h1>
            </div>

            {/* Error Message */}
            <div className="glass-card max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Page Not Found
              </h2>
              
              <p className="text-xl text-gray-300 mb-8">
                Oops! The audio file you're looking for seems to have been lost in the mix. 
                The page you requested doesn't exist or may have been moved.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/" className="btn-primary flex items-center justify-center">
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </Link>
                
                <Link href="/tools" className="btn-secondary flex items-center justify-center">
                  <Music className="w-5 h-5 mr-2" />
                  Browse Tools
                </Link>
              </div>

              {/* Helpful Links */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-gray-400 mb-4">
                  You might be looking for:
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <Link href="/tools/vocal-remover" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Vocal Remover
                  </Link>
                  <Link href="/tools/converter" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Audio Converter
                  </Link>
                  <Link href="/tools/pitch-tempo" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Pitch & Tempo
                  </Link>
                  <Link href="/tools/equalizer" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Equalizer
                  </Link>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-8">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}