<template>
  <div class="py-16 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Get in Touch
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions, feedback, or need support? We'd love to hear from you. 
          Send us a message and we'll get back to you as soon as possible.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="card p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                v-model="form.name"
                type="text"
                id="name"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                v-model="form.email"
                type="email"
                id="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <select
                v-model="form.subject"
                id="subject"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="partnership">Partnership/Business</option>
              </select>
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                v-model="form.message"
                id="message"
                rows="6"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="btn-primary w-full py-3 text-lg font-semibold disabled:opacity-50"
            >
              <span v-if="isSubmitting" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
              <span v-else>Send Message</span>
            </button>
          </form>

          <!-- Success Message -->
          <div v-if="showSuccess" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</p>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="showError" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-red-800 font-medium">There was an error sending your message. Please try again.</p>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Support -->
          <div class="card p-6">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-blue-100 rounded-lg">
                <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 ml-4">Technical Support</h3>
            </div>
            <p class="text-gray-600 mb-4">
              Need help with our tools? Our technical support team is here to assist you with any issues or questions.
            </p>
            <p class="text-sm text-gray-500">
              Response time: Within 24 hours
            </p>
          </div>

          <!-- Business -->
          <div class="card p-6">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-green-100 rounded-lg">
                <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 ml-4">Business Inquiries</h3>
            </div>
            <p class="text-gray-600 mb-4">
              Interested in partnerships, enterprise solutions, or custom integrations? Let's discuss how we can work together.
            </p>
            <p class="text-sm text-gray-500">
              Response time: Within 48 hours
            </p>
          </div>

          <!-- Feedback -->
          <div class="card p-6">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 ml-4">Feedback & Suggestions</h3>
            </div>
            <p class="text-gray-600 mb-4">
              Your feedback helps us improve ODOREMOVER. Share your ideas, suggestions, or feature requests with us.
            </p>
            <p class="text-sm text-gray-500">
              We read every message and value your input
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Contact Us - ODOREMOVER',
  meta: [
    { name: 'description', content: 'Get in touch with ODOREMOVER for support, partnerships, or feedback. We\'re here to help with all your audio processing needs.' }
  ]
})

// Form state
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

// Submit form
const submitForm = async () => {
  isSubmitting.value = true
  showSuccess.value = false
  showError.value = false

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
    
    showSuccess.value = true
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
    
  } catch (error) {
    showError.value = true
    
    // Hide error message after 5 seconds
    setTimeout(() => {
      showError.value = false
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>
<template>
  <div class="max-w-4xl mx-auto px-4 py-20">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
    <div class="card p-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-semibold mb-4">Get In Touch</h3>
          <p class="text-gray-600 mb-6">
            Have questions about our audio processing tools? We'd love to hear from you.
          </p>
          <div class="space-y-4">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>support@odoremover.com</span>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-4">Send Message</h3>
          <form class="space-y-4">
            <input type="text" placeholder="Your Name" class="w-full p-3 border border-gray-300 rounded-lg">
            <input type="email" placeholder="Your Email" class="w-full p-3 border border-gray-300 rounded-lg">
            <textarea placeholder="Your Message" rows="4" class="w-full p-3 border border-gray-300 rounded-lg"></textarea>
            <button type="submit" class="btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Contact Us - ODOREMOVER'
})
</script>
