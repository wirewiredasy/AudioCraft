import React from 'react'

// ODOREMOVER Main Logo - Complex and Unique Design
export const OdoremoverLogo = ({ className = "w-8 h-8", color = "text-white" }) => (
  <svg className={`${className} ${color}`} viewBox="0 0 64 64" fill="currentColor">
    {/* Complex geometric pattern representing audio waves and removal */}
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="33%" stopColor="#8B5CF6" />
        <stop offset="66%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    </defs>
    
    {/* Main circular base */}
    <circle cx="32" cy="32" r="30" fill="url(#logoGradient)" opacity="0.1" />
    
    {/* Central diamond with audio symbol */}
    <path d="M32 8L48 24L32 40L16 24Z" fill="url(#logoGradient)" />
    
    {/* Audio wave patterns */}
    <path d="M12 20h8l4-4v12l-4-4h-8z" fill="currentColor" opacity="0.8" />
    <path d="M28 16c0-2 2-4 4-4s4 2 4 4v16c0 2-2 4-4 4s-4-2-4-4z" fill="currentColor" />
    <path d="M44 20h8l4-4v12l-4-4h-8z" fill="currentColor" opacity="0.8" />
    
    {/* Removal effect lines */}
    <path d="M8 32h48M32 8v48" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    <circle cx="32" cy="32" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
    
    {/* Corner accent dots */}
    <circle cx="8" cy="8" r="3" fill="currentColor" opacity="0.4" />
    <circle cx="56" cy="8" r="3" fill="currentColor" opacity="0.4" />
    <circle cx="8" cy="56" r="3" fill="currentColor" opacity="0.4" />
    <circle cx="56" cy="56" r="3" fill="currentColor" opacity="0.4" />
  </svg>
)

// Vocal Remover Icon
export const VocalRemoverIcon = ({ className = "w-6 h-6", color = "text-blue-400" }) => (
  <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V3c0-1.1-.9-2-2-2z"/>
    <path d="M19 10c0 3.5-2.4 6.2-5.5 7v1.5h2c.6 0 1 .4 1 1s-.4 1-1 1h-6c-.6 0-1-.4-1-1s.4-1 1-1h2V17c-3.1-.8-5.5-3.5-5.5-7H5c0 4.1 3.1 7.5 7 7.9V19h-2c-.6 0-1 .4-1 1s.4 1 1 1h6c.6 0 1-.4 1-1s-.4-1-1-1h-2v-1.1c3.9-.4 7-3.8 7-7.9h-1z"/>
    <path d="M3 12l4-4v8z" opacity="0.6"/>
    <path d="M21 12l-4-4v8z" opacity="0.6"/>
  </svg>
)

// Audio Splitter Icon
export const AudioSplitterIcon = ({ className = "w-6 h-6", color = "text-green-400" }) => (
  <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 6h4l2-2v16l-2-2H3V6z"/>
    <path d="M11 4h2v16h-2z"/>
    <path d="M17 6h4l2-2v16l-2-2h-4V6z"/>
    <path d="M14 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M10 8L6 12l4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
)

// Pitch Tempo Icon
export const PitchTempoIcon = ({ className = "w-6 h-6", color = "text-purple-400" }) => (
  <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 12h18l-3-3m0 6l3-3"/>
    <circle cx="6" cy="12" r="2"/>
    <circle cx="12" cy="8" r="3"/>
    <circle cx="18" cy="16" r="2"/>
    <path d="M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth="1" fill="none"/>
    <path d="M6 14v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4" stroke="currentColor" strokeWidth="1" fill="none"/>
  </svg>
)

// Audio Converter Icon
export const ConverterIcon = ({ className = "w-6 h-6", color = "text-cyan-400" }) => (
  <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h4v4H4zM10 4h4v4h-4zM16 4h4v4h-4z"/>
    <path d="M12 10l-3 3h2v4h2v-4h2l-3-3z"/>
    <path d="M4 16h4v4H4zM10 16h4v4h-4zM16 16h4v4h-4z"/>
    <path d="M8 8v2M12 8v2M16 8v2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

// Audio Recorder Icon
export const RecorderIcon = ({ className = "w-6 h-6", color = "text-red-400" }) => (
  <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="8" r="3"/>
    <path d="M12 14v5h-3m6 0h-3m0 0v2"/>
    <path d="M8 6l-2-2M16 6l2-2M12 2v2"/>
    <circle cx="12" cy="8" r="1" className="animate-pulse"/>
  </svg>
)

// Karaoke Icon
export const KaraokeIcon = ({ className = "w-6 h-6", color = "text-pink-400" }) => (
  <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2s2-.9 2-2V3c0-1.1-.9-2-2-2z"/>
    <path d="M19 9c0 3-2.2 5.4-5 5.9V17h2c.6 0 1 .4 1 1s-.4 1-1 1h-6c-.6 0-1-.4-1-1s.4-1 1-1h2v-2.1C8.2 14.4 6 12 6 9H5c0 3.5 2.6 6.4 6 6.9V18h-1c-.6 0-1 .4-1 1s.4 1 1 1h6c.6 0 1-.4 1-1s-.4-1-1-1h-1v-2.1c3.4-.5 6-3.4 6-6.9h-1z"/>
    <path d="M7 12l-3-1.5v3L7 12zM17 12l3-1.5v3L17 12z"/>
    <path d="M9 18h6v2H9z"/>
  </svg>
)

// Noise Reduction Icon
export const NoiseReductionIcon = ({ className = "w-6 h-6", color = "text-indigo-400" }) => (
  <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 12h4l3-6v12l-3-6H3z"/>
    <path d="M15 8c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"/>
    <path d="M18 6c2.2 0 4 1.8 4 4v4c0 2.2-1.8 4-4 4"/>
    <path d="M11 6l8 12M19 6l-8 12" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
    <circle cx="12" cy="12" r="1"/>
  </svg>
)

// Cutter Joiner Icon
export const CutterJoinerIcon = ({ className = "w-6 h-6", color = "text-yellow-400" }) => (
  <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 6h6v3H3zM15 6h6v3h-6z"/>
    <path d="M3 15h6v3H3zM15 15h6v3h-6z"/>
    <path d="M9 7.5h6v1H9zM9 15.5h6v1H9z"/>
    <path d="M11 10v4h2v-4z"/>
    <circle cx="12" cy="12" r="1"/>
  </svg>
)

// Volume Normalizer Icon
export const VolumeNormalizerIcon = ({ className = "w-6 h-6", color = "text-orange-400" }) => (
  <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 12h4l3-4v8l-3-4H3z"/>
    <path d="M14 8v8M16 6v12M18 4v16M20 7v10"/>
    <circle cx="14" cy="12" r="1"/>
    <circle cx="16" cy="12" r="1"/>
    <circle cx="18" cy="12" r="1"/>
    <circle cx="20" cy="12" r="1"/>
  </svg>
)

// Equalizer Icon
export const EqualizerIcon = ({ className = "w-6 h-6", color = "text-teal-400" }) => (
  <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="6" width="2" height="12" rx="1"/>
    <rect x="7" y="4" width="2" height="16" rx="1"/>
    <rect x="11" y="8" width="2" height="8" rx="1"/>
    <rect x="15" y="2" width="2" height="20" rx="1"/>
    <rect x="19" y="7" width="2" height="10" rx="1"/>
    <circle cx="4" cy="10" r="1"/>
    <circle cx="8" cy="8" r="1"/>
    <circle cx="12" cy="14" r="1"/>
    <circle cx="16" cy="6" r="1"/>
    <circle cx="20" cy="12" r="1"/>
  </svg>
)

// Support Icon
export const SupportIcon = ({ className = "w-6 h-6", color = "text-blue-400" }) => (
  <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <point cx="12" cy="17" />
    <circle cx="12" cy="17" r="1"/>
    <path d="M8 12h8M12 8v8"/>
  </svg>
)

// Account/User Icon
export const AccountIcon = ({ className = "w-6 h-6", color = "text-gray-400" }) => (
  <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="8" r="4"/>
    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
    <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
  </svg>
)

// Language Icon
export const LanguageIcon = ({ className = "w-6 h-6", color = "text-gray-400" }) => (
  <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    <path d="M8 12c0-3.3 1.8-6 4-6s4 2.7 4 6-1.8 6-4 6-4-2.7-4-6z" fill="none" stroke="currentColor" strokeWidth="1"/>
  </svg>
)