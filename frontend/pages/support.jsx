import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { 
  ArrowLeft,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  FileText,
  Users,
  Star
} from 'lucide-react'

export default function Support() {
  const [activeTab, setActiveTab] = useState('faq')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const faqs = [
    {
      question: "How do I remove vocals from a song?",
      answer: "Simply upload your audio file to the Vocal Remover tool, and our AI will automatically separate the vocals from the music. You'll get both the instrumental (karaoke) and vocal (acapella) versions."
    },
    {
      question: "What audio formats are supported?",
      answer: "We support all major audio formats including MP3, WAV, FLAC, AAC, OGG, M4A, and WMA. Files are automatically converted to the best format for processing."
    },
    {
      question: "Is there a file size limit?",
      answer: "Free users can upload files up to 50MB. For larger files and batch processing, consider upgrading to our Pro plan."
    },
    {
      question: "How long does processing take?",
      answer: "Most audio files are processed within 30-60 seconds, depending on the file size and selected tool. Our AI algorithms are optimized for speed and quality."
    },
    {
      question: "Are my files stored on your servers?",
      answer: "No, your files are automatically deleted from our servers after 1 hour for security and privacy. We never store your personal audio files."
    },
    {
      question: "Can I use the processed audio commercially?",
      answer: "You can use the processed audio according to the original copyright terms. We don't claim any rights to your audio - you retain full ownership of your processed files."
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', contactForm)
  }

  return (
    <>
      <Head>
        <title>Support - Audio Processing Tools Help Center</title>
        <meta name="description" content="Get help with our audio processing tools. Find answers to common questions, contact support, and learn how to use our features." />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="border-b border-gray-800 bg-gray-800/50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link 
                  href="/"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Home</span>
                </Link>
                <div className="h-6 w-px bg-gray-600"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Support Center</h1>
                    <p className="text-sm text-gray-400">Get Help & Resources</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How can we help you?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Find answers to common questions, learn how to use our tools, or get in touch with our support team.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Average Response</h3>
              <p className="text-2xl font-bold text-green-400">&lt; 2 hours</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Happy Users</h3>
              <p className="text-2xl font-bold text-blue-400">50,000+</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Satisfaction Rate</h3>
              <p className="text-2xl font-bold text-yellow-400">98%</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex-1 px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'faq'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4 inline mr-2" />
              FAQ
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`flex-1 px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'contact'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Contact Us
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`flex-1 px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'guides'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Guides
            </button>
          </div>

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-800 rounded-lg border border-gray-700">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <h4 className="font-semibold text-lg">{faq.question}</h4>
                      <ChevronDownIcon className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">Get in Touch</h3>
              
              {/* Contact Methods */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 text-center">
                  <Mail className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Email Support</h4>
                  <p className="text-gray-400 text-sm mb-3">Get help via email</p>
                  <a 
                    href="mailto:support@vocalremover.org"
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    support@vocalremover.org
                  </a>
                </div>
                
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Live Chat</h4>
                  <p className="text-gray-400 text-sm mb-3">Chat with our team</p>
                  <button className="text-green-400 hover:text-green-300 text-sm">
                    Start Chat
                  </button>
                </div>
                
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 text-center">
                  <Phone className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Phone Support</h4>
                  <p className="text-gray-400 text-sm mb-3">Call us directly</p>
                  <a 
                    href="tel:+1-555-0123"
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    +1 (555) 012-3456
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
                <h4 className="text-xl font-semibold mb-6">Send us a message</h4>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Guides Tab */}
          {activeTab === 'guides' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <h3 className="text-2xl font-bold mb-6 col-span-full">How-to Guides</h3>
              
              {[
                {
                  title: "How to Remove Vocals",
                  description: "Step-by-step guide to create karaoke tracks",
                  icon: "🎤"
                },
                {
                  title: "Audio Format Conversion",
                  description: "Convert between different audio formats",
                  icon: "🔄"
                },
                {
                  title: "Pitch & Tempo Adjustment",
                  description: "Change speed and pitch independently",
                  icon: "🎵"
                },
                {
                  title: "Audio Cutting & Joining",
                  description: "Edit and combine audio files",
                  icon: "✂️"
                },
                {
                  title: "Volume Normalization",
                  description: "Balance audio levels perfectly",
                  icon: "🔊"
                },
                {
                  title: "Noise Reduction Tips",
                  description: "Clean up audio recordings",
                  icon: "🔇"
                }
              ].map((guide, index) => (
                <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-blue-500 transition-colors cursor-pointer">
                  <div className="text-4xl mb-4">{guide.icon}</div>
                  <h4 className="text-lg font-semibold mb-2">{guide.title}</h4>
                  <p className="text-gray-400 text-sm">{guide.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// Simple chevron down icon
const ChevronDownIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)