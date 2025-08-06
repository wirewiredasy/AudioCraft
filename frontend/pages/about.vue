<template>
  <div class="py-16 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          About ODOREMOVER
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          We're on a mission to make professional audio processing accessible to everyone, 
          from musicians and podcasters to content creators and audio enthusiasts.
        </p>
      </div>

      <!-- Story Section -->
      <div class="card p-8 md:p-12 mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
        <div class="prose prose-lg max-w-none text-gray-600">
          <p class="mb-6">
            ODOREMOVER was born from a simple idea: audio processing shouldn't require expensive software 
            or technical expertise. Whether you're a musician looking to create karaoke tracks, a podcaster 
            wanting to clean up background noise, or a content creator needing to adjust audio for your videos, 
            we believe you should have access to professional-grade tools.
          </p>
          <p class="mb-6">
            Our platform combines cutting-edge AI algorithms with an intuitive interface, making complex 
            audio processing tasks as simple as uploading a file and clicking a button. We've built our 
            tools to handle the technical complexity behind the scenes, so you can focus on your creativity.
          </p>
          <p>
            Today, ODOREMOVER serves thousands of users worldwide, from bedroom producers to professional 
            studios, all united by the need for accessible, high-quality audio processing tools.
          </p>
        </div>
      </div>

      <!-- Mission & Values -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="card p-8">
          <div class="p-3 bg-blue-100 rounded-lg inline-block mb-4">
            <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p class="text-gray-600">
            To democratize audio processing by providing professional-grade tools that are accessible, 
            affordable, and easy to use for creators of all skill levels.
          </p>
        </div>

        <div class="card p-8">
          <div class="p-3 bg-green-100 rounded-lg inline-block mb-4">
            <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
          <p class="text-gray-600">
            We believe in quality, privacy, and simplicity. Every tool we build is designed with 
            these principles in mind, ensuring you get the best results while maintaining your privacy.
          </p>
        </div>
      </div>

      <!-- Features -->
      <div class="card p-8 md:p-12 mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Us</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="p-3 bg-purple-100 rounded-full inline-block mb-4">
              <svg class="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">No Installation Required</h3>
            <p class="text-gray-600 text-sm">
              Process your audio files directly in your browser. No software downloads or installations needed.
            </p>
          </div>

          <div class="text-center">
            <div class="p-3 bg-red-100 rounded-full inline-block mb-4">
              <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Privacy First</h3>
            <p class="text-gray-600 text-sm">
              Your files are automatically deleted after processing. We never store or share your audio content.
            </p>
          </div>

          <div class="text-center">
            <div class="p-3 bg-orange-100 rounded-full inline-block mb-4">
              <svg class="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Professional Quality</h3>
            <p class="text-gray-600 text-sm">
              Powered by advanced algorithms and AI technology for studio-quality results every time.
            </p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Audio?</h2>
        <p class="text-gray-600 mb-8">
          Join thousands of creators who trust ODOREMOVER for their audio processing needs.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/tools" class="btn-primary px-8 py-3 text-lg font-semibold">
            Explore Tools
          </NuxtLink>
          <NuxtLink to="/contact" class="px-8 py-3 text-lg font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Get in Touch
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'About Us - ODOREMOVER',
  meta: [
    { name: 'description', content: 'Learn about ODOREMOVER\'s mission to make professional audio processing accessible to everyone through innovative tools and technology.' }
  ]
})
</script>