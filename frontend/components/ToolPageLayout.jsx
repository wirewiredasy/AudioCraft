import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'
import { OdoremoverLogo } from './CustomIcons'
import { ResponsiveContainer, MobileHeader, useResponsiveLayout } from './ResponsiveLayout'

export const ToolPageLayout = ({ 
  title, 
  description, 
  children, 
  icon: IconComponent,
  iconColor = "text-blue-400"
}) => {
  const { isMobile } = useResponsiveLayout()

  return (
    <>
      <Head>
        <title>{title} - ODOREMOVER Audio Suite</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {isMobile && (
        <MobileHeader 
          title={title}
          showBackButton={true}
          onBackClick={() => window.history.back()}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        
        <ResponsiveContainer className="relative z-10">
          {!isMobile && (
            <div className="pt-8 pb-6">
              {/* Navigation */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Home</span>
                </Link>
                <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform">
                  <OdoremoverLogo className="w-8 h-8 text-white" />
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    ODOREMOVER
                  </span>
                </Link>
              </div>

              {/* Page Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  {IconComponent && (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center mr-4">
                      <IconComponent className={`w-8 h-8 ${iconColor}`} />
                    </div>
                  )}
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{title}</h1>
                    <p className="text-lg text-gray-300">{description}</p>
                  </div>
                </div>
                
                {/* Branding line */}
                <div className="w-32 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
              </div>
            </div>
          )}

          {/* Tool Content */}
          <div className={isMobile ? "pt-20 pb-8" : "pb-16"}>
            {children}
          </div>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default ToolPageLayout