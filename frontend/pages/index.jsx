
import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import {
  OdoremoverLogo,
  VocalRemoverIcon,
  AudioSplitterIcon,
  PitchTempoIcon,
  CutterJoinerIcon,
  VolumeNormalizerIcon,
  RecorderIcon,
  KaraokeIcon,
  SupportIcon,
  AccountIcon,
  LanguageIcon
} from '../components/CustomIcons'
import { EnhancedHero } from '../components/EnhancedHero'
import { useResponsiveLayout } from '../components/ResponsiveLayout'
import Footer from '../components/Footer'

export default function OdoremoverHome() {
  const { isMobile, isSidebarOpen, setIsSidebarOpen } = useResponsiveLayout()

  // Sidebar navigation items with custom icons
  const sidebarItems = [
    { 
      icon: VocalRemoverIcon, 
      label: 'Remover', 
      href: '/tools/vocal-remover',
      isActive: true 
    },
    { 
      icon: AudioSplitterIcon, 
      label: 'Splitter', 
      href: '/tools/audio-splitter' 
    },
    { 
      icon: PitchTempoIcon, 
      label: 'Pitcher', 
      href: '/tools/pitch-tempo' 
    },
    { 
      icon: CutterJoinerIcon, 
      label: 'Cutter', 
      href: '/tools/cutter-joiner' 
    },
    { 
      icon: VolumeNormalizerIcon, 
      label: 'Volume', 
      href: '/tools/volume-normalizer' 
    },
    { 
      icon: RecorderIcon, 
      label: 'Recorder', 
      href: '/tools/recorder' 
    },
    { 
      icon: KaraokeIcon, 
      label: 'Karaoke', 
      href: '/tools/karaoke' 
    },
    { 
      icon: SupportIcon, 
      label: 'Support', 
      href: '/support' 
    }
  ]

  return (
    <>
      <Head>
        <title>ODOREMOVER - AI Audio Processing Suite [Professional Tools] | Remove Vocals Online Free</title>
        <meta name="description" content="Professional AI-powered audio processing with ODOREMOVER suite. Remove vocals from songs, adjust pitch/tempo, convert audio formats, reduce noise, and create karaoke tracks. Advanced algorithms for musicians and creators." />
        <meta name="keywords" content="odoremover, vocal remover online free, AI audio processing, pitch tempo changer, audio converter mp3, karaoke maker, noise reduction, audio splitter, professional audio editing, music producer tools" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://odoremover.app" />
        
        {/* Open Graph specific for homepage */}
        <meta property="og:title" content="ODOREMOVER - Professional AI Audio Processing Suite | Remove Vocals Free" />
        <meta property="og:description" content="Advanced audio processing tools with AI technology. Vocal removal, pitch adjustment, format conversion, noise reduction, and professional editing features." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://odoremover.app" />
        <meta property="og:image" content="https://odoremover.app/og-homepage.jpg" />
        
        {/* Twitter specific for homepage */}
        <meta name="twitter:title" content="ODOREMOVER - AI Audio Processing Suite | Remove Vocals Free" />
        <meta name="twitter:description" content="Professional audio tools powered by advanced AI algorithms. Remove vocals, adjust pitch/tempo, convert formats." />
        <meta name="twitter:image" content="https://odoremover.app/twitter-homepage.jpg" />
        
        {/* Enhanced structured data for homepage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ODOREMOVER Audio Processing Suite",
              "alternateName": "ODOREMOVER",
              "description": "Professional AI-powered audio processing suite for vocal removal, pitch adjustment, format conversion, noise reduction, and audio editing",
              "url": "https://odoremover.app",
              "sameAs": [
                "https://twitter.com/odoremover",
                "https://facebook.com/odoremover"
              ],
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "browserRequirements": "Requires JavaScript. Requires HTML5.",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "2547"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "creator": {
                "@type": "Organization",
                "name": "ODOREMOVER",
                "url": "https://odoremover.app"
              },
              "featureList": [
                "AI-Powered Vocal Removal",
                "Pitch & Tempo Adjustment", 
                "Audio Format Conversion",
                "Advanced Noise Reduction",
                "Audio Splitting & Separation",
                "Karaoke Track Creation",
                "Volume Normalization",
                "Audio Cutting & Joining"
              ],
              "screenshot": "https://odoremover.app/screenshot.jpg"
            })
          }}
        />
        
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How does AI vocal removal work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ODOREMOVER uses advanced AI algorithms to analyze audio frequencies and separate vocal tracks from instrumental music using spectral analysis and machine learning."
                  }
                },
                {
                  "@type": "Question", 
                  "name": "Is ODOREMOVER free to use?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, ODOREMOVER offers free audio processing tools including vocal removal, pitch adjustment, and format conversion with professional quality results."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What audio formats are supported?",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "ODOREMOVER supports MP3, WAV, FLAC, OGG, M4A, AAC and other popular audio formats for processing and conversion."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white flex">
        {/* Mobile Header */}
        {isMobile && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <OdoremoverLogo className="w-8 h-8 text-white" />
              <span className="text-lg font-bold">ODOREMOVER</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 ${isMobile ? 'w-full' : 'w-16'} bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
          isMobile 
            ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full')
            : (isSidebarOpen ? 'w-64' : 'w-16')
        }`}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 border-b border-gray-700 px-4">
            {(isSidebarOpen || isMobile) ? (
              <>
                <div className="flex items-center space-x-3">
                  <OdoremoverLogo className="w-8 h-8 text-white" />
                  <span className="text-lg font-bold">ODOREMOVER</span>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors mx-auto"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Sidebar Navigation */}
          <nav className="mt-8 space-y-2 px-2">
            {sidebarItems.map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className={`flex items-center px-3 py-3 rounded-lg transition-colors group ${
                  item.isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && (
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom Items */}
          <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-700">
            <Link href="/auth/login" className="flex items-center px-3 py-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
              <AccountIcon className="w-5 h-5 flex-shrink-0" />
              {(isSidebarOpen || isMobile) && (
                <span className="ml-3 text-sm font-medium">Sign In</span>
              )}
            </Link>
            <div className="flex items-center px-3 py-2 text-xs text-gray-500">
              <LanguageIcon className="w-4 h-4 flex-shrink-0" />
              {(isSidebarOpen || isMobile) && (
                <span className="ml-2">English</span>
              )}
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          isMobile 
            ? 'ml-0 pt-16' 
            : (isSidebarOpen ? 'ml-64' : 'ml-16')
        }`}>
          {/* Enhanced Hero Section */}
          <EnhancedHero />
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  )
}
