
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
    <div class="max-w-4xl mx-auto px-6">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p class="text-xl text-gray-600">Get in touch with our team</p>
      </div>

      <div class="grid md:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h2>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input 
                v-model="form.name"
                type="text" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your name"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="form.email"
                type="email" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input 
                v-model="form.subject"
                type="text" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Message subject"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                v-model="form.message"
                required
                rows="5"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your message..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
            >
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="space-y-8">
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Email</p>
                  <p class="text-gray-600">support@odoremover.com</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Phone</p>
                  <p class="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Address</p>
                  <p class="text-gray-600">123 Audio Street, Music City, MC 12345</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Business Hours</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Monday - Friday</span>
                <span class="font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Saturday</span>
                <span class="font-medium">10:00 AM - 4:00 PM</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Sunday</span>
                <span class="font-medium">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

useHead({
  title: 'Contact Us - ODOREMOVER',
  meta: [
    { name: 'description', content: 'Get in touch with ODOREMOVER team for support and inquiries' }
  ]
})

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
    alert('Message sent successfully!')
  } catch (error) {
    alert('Error sending message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
