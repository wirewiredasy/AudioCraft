<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- Header -->
    <header class="w-full bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/20">
      <nav class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-black gradient-text hover:scale-105 transition-transform">
          🎵 ODOREMOVER
        </NuxtLink>
        <ul class="hidden md:flex space-x-6 text-sm font-semibold">
          <li>
            <NuxtLink 
              to="/" 
              class="text-gray-700 hover:text-blue-600 transition-all px-3 py-2 rounded-lg hover:bg-white/50 hover:scale-105"
            >
              🏠 Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/tools" 
              class="text-gray-700 hover:text-green-600 transition-all px-3 py-2 rounded-lg hover:bg-white/50 hover:scale-105"
            >
              🛠️ Tools
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/about" 
              class="text-gray-700 hover:text-purple-600 transition-all px-3 py-2 rounded-lg hover:bg-white/50 hover:scale-105"
            >
              ℹ️ About
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/contact" 
              class="text-gray-700 hover:text-orange-600 transition-all px-3 py-2 rounded-lg hover:bg-white/50 hover:scale-105"
            >
              📞 Contact
            </NuxtLink>
          </li>
        </ul>
        
        <!-- Mobile menu button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-white/50 transition-all hover:scale-105"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </nav>
      
      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-white/20 bg-white/95 backdrop-blur-md">
        <div class="px-4 py-4 space-y-2">
          <NuxtLink 
            to="/" 
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-white/50 rounded-lg transition-all"
          >
            🏠 Home
          </NuxtLink>
          <NuxtLink 
            to="/tools" 
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 text-sm font-semibold text-gray-700 hover:text-green-600 hover:bg-white/50 rounded-lg transition-all"
          >
            🛠️ Tools
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 text-sm font-semibold text-gray-700 hover:text-purple-600 hover:bg-white/50 rounded-lg transition-all"
          >
            ℹ️ About
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-white/50 rounded-lg transition-all"
          >
            📞 Contact
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-50 py-12 mt-16 border-t border-gray-200">
      <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-gray-900">ODOREMOVER</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            Your trusted platform for professional audio processing tools. 
            Remove vocals, adjust pitch, convert formats, and more.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Tools -->
        <div class="space-y-4">
          <h4 class="font-semibold text-gray-900">Audio Tools</h4>
          <ul class="space-y-2 text-sm text-gray-600">
            <li>
              <NuxtLink to="/vocal-remover" class="hover:text-blue-600 transition-colors">
                Vocal Remover
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/pitch-shifter" class="hover:text-blue-600 transition-colors">
                Pitch & Tempo
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/format-converter" class="hover:text-blue-600 transition-colors">
                Format Converter
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/audio-editor" class="hover:text-blue-600 transition-colors">
                Audio Editor
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/noise-reducer" class="hover:text-blue-600 transition-colors">
                Noise Reducer
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div class="space-y-4">
          <h4 class="font-semibold text-gray-900">Company</h4>
          <ul class="space-y-2 text-sm text-gray-600">
            <li>
              <NuxtLink to="/about" class="hover:text-blue-600 transition-colors">
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-blue-600 transition-colors">
                Contact
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="hover:text-blue-600 transition-colors">
                Blog
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/help" class="hover:text-blue-600 transition-colors">
                Help Center
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="space-y-4">
          <h4 class="font-semibold text-gray-900">Legal</h4>
          <ul class="space-y-2 text-sm text-gray-600">
            <li>
              <NuxtLink to="/privacy" class="hover:text-blue-600 transition-colors">
                Privacy Policy
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms" class="hover:text-blue-600 transition-colors">
                Terms of Service
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cookies" class="hover:text-blue-600 transition-colors">
                Cookie Policy
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-gray-200">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-gray-500">
            © 2025 ODOREMOVER. All rights reserved.
          </p>
          <p class="text-sm text-gray-500 mt-2 md:mt-0">
            Made with ❤️ for audio enthusiasts
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const mobileMenuOpen = ref(false)

// Close mobile menu when route changes
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>