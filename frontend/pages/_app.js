
import '../styles/globals.css'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ODOREMOVER - Professional AI Audio Processing Suite | Remove Vocals, Edit Audio</title>
        <meta name="description" content="Professional AI-powered audio processing tools. Remove vocals, adjust pitch/tempo, convert formats, reduce noise, and edit audio with advanced algorithms. Free online audio editor." />
        <meta name="keywords" content="vocal remover, audio editor, pitch changer, tempo adjuster, audio converter, noise reduction, karaoke maker, AI audio processing, online audio tools, music editor" />
        <meta name="author" content="ODOREMOVER" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="canonical" href="https://odoremover.app" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://odoremover.app" />
        <meta property="og:title" content="ODOREMOVER - Professional AI Audio Processing Suite" />
        <meta property="og:description" content="Advanced audio processing tools with AI technology. Remove vocals, adjust pitch/tempo, convert formats, and professional editing features." />
        <meta property="og:image" content="https://odoremover.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="ODOREMOVER" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://odoremover.app" />
        <meta name="twitter:title" content="ODOREMOVER - Professional AI Audio Processing Suite" />
        <meta name="twitter:description" content="Advanced audio processing tools with AI technology. Remove vocals, adjust pitch/tempo, convert formats, and professional editing features." />
        <meta name="twitter:image" content="https://odoremover.app/twitter-image.jpg" />
        <meta name="twitter:creator" content="@odoremover" />
        <meta name="twitter:site" content="@odoremover" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#1f2937" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ODOREMOVER",
              "description": "Professional AI-powered audio processing suite for vocal removal, pitch adjustment, format conversion, and audio editing",
              "url": "https://odoremover.app",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "browserRequirements": "Requires JavaScript. Requires HTML5.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "ODOREMOVER"
              },
              "featureList": [
                "AI Vocal Removal",
                "Pitch & Tempo Adjustment", 
                "Audio Format Conversion",
                "Noise Reduction",
                "Audio Splitting",
                "Karaoke Creation"
              ]
            })
          }}
        />
      </Head>
      
      <Component {...pageProps} />
      
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }}
      />
    </>
  )
}
