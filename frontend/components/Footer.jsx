
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <h3 className="text-xl font-bold text-white">ODOREMOVER</h3>
            </div>
            <p className="text-gray-400 max-w-md">
              Professional audio processing suite for vocal removal, pitch adjustment, format conversion, and more.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/tools/vocal-remover" className="hover:text-white transition-colors">Vocal Remover</Link></li>
              <li><Link href="/tools/audio-splitter" className="hover:text-white transition-colors">Audio Splitter</Link></li>
              <li><Link href="/tools/pitch-tempo" className="hover:text-white transition-colors">Pitch & Tempo</Link></li>
              <li><Link href="/tools/recorder" className="hover:text-white transition-colors">Recorder</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/support" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 ODOREMOVER. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
