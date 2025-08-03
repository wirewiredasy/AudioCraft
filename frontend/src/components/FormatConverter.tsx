import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import { FileUpload } from './FileUpload'
import { audioApi } from '../lib/api'

const SUPPORTED_FORMATS = [
  { value: 'mp3', label: 'MP3' },
  { value: 'wav', label: 'WAV' },
  { value: 'flac', label: 'FLAC' },
  { value: 'm4a', label: 'M4A' },
  { value: 'ogg', label: 'OGG' }
]

export const FormatConverter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [targetFormat, setTargetFormat] = useState<string>('mp3')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setResult(null)
    setError(null)
  }

  const handleProcess = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setError(null)

    try {
      const response = await audioApi.convertFormat(selectedFile, targetFormat)
      setResult(response)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to convert audio file')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Format Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FileUpload 
            onFileSelect={handleFileSelect}
            isProcessing={isProcessing}
          />
          
          {selectedFile && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">Selected file:</p>
              <p className="text-sm text-gray-600">{selectedFile.name}</p>
              <p className="text-sm text-gray-600">
                Current format: {selectedFile.name.split('.').pop()?.toUpperCase()}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Target Format</label>
            <select
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {SUPPORTED_FORMATS.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
          </div>

          <Button 
            onClick={handleProcess}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? 'Converting...' : `Convert to ${targetFormat.toUpperCase()}`}
          </Button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {result && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium mb-2">Conversion Complete!</p>
              <p className="text-sm text-green-700">{result.message}</p>
              {result.output_url && (
                <div className="mt-3">
                  <audio controls className="w-full">
                    <source src={result.output_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <a 
                    href={result.output_url} 
                    download 
                    className="inline-block mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Download converted file
                  </a>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}