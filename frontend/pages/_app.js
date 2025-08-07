import '../styles/globals.css'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ODOREMOVER Audio Suite</title>
        <meta name="description" content="Professional audio processing tools - Remove vocals, adjust pitch, convert formats, and more" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
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