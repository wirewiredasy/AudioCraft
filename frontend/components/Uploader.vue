<template>
  <div class="w-full">
    <!-- Upload Zone -->
    <div
      @drop="handleDrop"
      @dragover.prevent
      @dragenter.prevent
      @dragleave="handleDragLeave"
      @click="triggerFileInput"
      :class="[
        'upload-zone cursor-pointer p-8 text-center transition-all duration-300',
        isDragOver ? 'drag-over' : '',
        isUploading ? 'pointer-events-none opacity-60' : ''
      ]"
    >
      <input
        ref="fileInput"
        type="file"
        accept="audio/*"
        @change="handleFileSelect"
        class="hidden"
      />
      
      <!-- Upload Icon -->
      <div class="mb-4">
        <svg v-if="!isUploading" class="mx-auto h-12 w-12 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        <svg v-else class="mx-auto h-12 w-12 text-white opacity-60 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
      </div>

      <!-- Upload Text -->
      <div class="text-white">
        <p v-if="!selectedFile && !isUploading" class="text-lg font-medium">
          Drop your audio file here
        </p>
        <p v-else-if="isUploading" class="text-lg font-medium">
          Processing {{ selectedFile?.name }}...
        </p>
        <p v-else class="text-lg font-medium text-green-300">
          ✓ {{ selectedFile?.name }}
        </p>
        
        <p v-if="!isUploading" class="text-sm opacity-75 mt-2">
          or click to browse files
        </p>
        <p class="text-xs opacity-60 mt-1">
          Supports: MP3, WAV, FLAC, M4A, AAC, OGG
        </p>
      </div>

      <!-- Progress Bar -->
      <div v-if="isUploading && uploadProgress > 0" class="mt-4">
        <div class="w-full bg-white bg-opacity-20 rounded-full h-2">
          <div 
            class="progress-bar h-2"
            :style="{ width: uploadProgress + '%' }"
          ></div>
        </div>
        <p class="text-sm text-white opacity-75 mt-2">
          {{ uploadProgress }}% complete
        </p>
      </div>
    </div>

    <!-- File Info -->
    <div v-if="selectedFile && !isUploading" class="mt-4 p-4 glass-card">
      <div class="flex items-center justify-between text-white">
        <div>
          <p class="font-medium">{{ selectedFile.name }}</p>
          <p class="text-sm opacity-75">
            {{ formatFileSize(selectedFile.size) }} • {{ getFileExtension(selectedFile.name).toUpperCase() }}
          </p>
        </div>
        <button
          @click="clearFile"
          class="text-red-400 hover:text-red-300 transition-colors"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="mt-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg">
      <p class="text-red-300 text-sm">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: File | null
  isUploading?: boolean
  uploadProgress?: number
  maxSize?: number // in MB
}

interface Emits {
  (e: 'update:modelValue', file: File | null): void
  (e: 'file-selected', file: File): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  isUploading: false,
  uploadProgress: 0,
  maxSize: 100
})

const emit = defineEmits<Emits>()

const fileInput = ref<HTMLInputElement>()
const isDragOver = ref(false)
const errorMessage = ref('')

const selectedFile = computed(() => props.modelValue)

const allowedTypes = [
  'audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/flac', 
  'audio/mp4', 'audio/aac', 'audio/ogg', 'audio/webm'
]

const allowedExtensions = ['.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg', '.webm']

// File validation
const validateFile = (file: File): boolean => {
  errorMessage.value = ''
  
  // Check file size
  const sizeInMB = file.size / (1024 * 1024)
  if (sizeInMB > props.maxSize) {
    errorMessage.value = `File size must be less than ${props.maxSize}MB`
    return false
  }
  
  // Check file type
  const extension = getFileExtension(file.name).toLowerCase()
  if (!allowedExtensions.includes(extension) && !allowedTypes.includes(file.type)) {
    errorMessage.value = 'Please select a valid audio file'
    return false
  }
  
  return true
}

// Handle file selection
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file && validateFile(file)) {
    emit('update:modelValue', file)
    emit('file-selected', file)
  } else if (file) {
    target.value = ''
  }
}

// Handle drag and drop
const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    const file = files[0]
    if (validateFile(file)) {
      emit('update:modelValue', file)
      emit('file-selected', file)
    }
  }
}

const handleDragLeave = (event: DragEvent) => {
  if (!event.currentTarget?.contains(event.relatedTarget as Node)) {
    isDragOver.value = false
  }
}

// Trigger file input
const triggerFileInput = () => {
  if (!props.isUploading) {
    fileInput.value?.click()
  }
}

// Clear selected file
const clearFile = () => {
  emit('update:modelValue', null)
  errorMessage.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Utility functions
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getFileExtension = (filename: string): string => {
  return filename.slice(filename.lastIndexOf('.'))
}

// Watchers
watch(() => props.isUploading, (newValue) => {
  if (newValue) {
    errorMessage.value = ''
  }
})
</script>