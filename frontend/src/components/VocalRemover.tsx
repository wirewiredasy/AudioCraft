import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import { FileUpload } from './FileUpload'
import { audioApi } from '../lib/api'

export const VocalRemover: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
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
      const response = await audioApi.removeVocals(selectedFile)
      setResult(response)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to process audio file')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vocal Remover</CardTitle>
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
                Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          )}

          <Button 
            onClick={handleProcess}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? 'Removing Vocals...' : 'Remove Vocals'}
          </Button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {result && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium mb-2">Success!</p>
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
                    Download processed file
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