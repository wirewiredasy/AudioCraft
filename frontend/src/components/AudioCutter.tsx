import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { FileUpload } from './FileUpload'
import { audioApi } from '../lib/api'

export const AudioCutter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [joinFile, setJoinFile] = useState<File | null>(null)
  const [operation, setOperation] = useState<'cut' | 'join'>('cut')
  const [startTime, setStartTime] = useState<number>(0)
  const [endTime, setEndTime] = useState<number>(30)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setResult(null)
    setError(null)
  }

  const handleJoinFileSelect = (file: File) => {
    setJoinFile(file)
    setResult(null)
    setError(null)
  }

  const handleProcess = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setError(null)

    try {
      const response = await audioApi.cutJoinAudio(
        selectedFile,
        operation,
        operation === 'cut' ? startTime : undefined,
        operation === 'cut' ? endTime : undefined,
        operation === 'join' ? joinFile || undefined : undefined
      )
      setResult(response)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to process audio')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Audio Cutter & Joiner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex space-x-4">
            <Button
              variant={operation === 'cut' ? 'default' : 'outline'}
              onClick={() => setOperation('cut')}
              className="flex-1"
            >
              Cut Audio
            </Button>
            <Button
              variant={operation === 'join' ? 'default' : 'outline'}
              onClick={() => setOperation('join')}
              className="flex-1"
            >
              Join Audio
            </Button>
          </div>

          <FileUpload 
            onFileSelect={handleFileSelect}
            isProcessing={isProcessing}
          />
          
          {selectedFile && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">Main file:</p>
              <p className="text-sm text-gray-600">{selectedFile.name}</p>
            </div>
          )}

          {operation === 'cut' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Time (seconds)</label>
                <Input
                  type="number"
                  value={startTime}
                  onChange={(e) => setStartTime(parseFloat(e.target.value) || 0)}
                  min={0}
                  step={0.1}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">End Time (seconds)</label>
                <Input
                  type="number"
                  value={endTime}
                  onChange={(e) => setEndTime(parseFloat(e.target.value) || 30)}
                  min={0}
                  step={0.1}
                  placeholder="30"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm font-medium">Select second file to join:</p>
              <FileUpload 
                onFileSelect={handleJoinFileSelect}
                isProcessing={isProcessing}
              />
              {joinFile && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium">Second file:</p>
                  <p className="text-sm text-gray-600">{joinFile.name}</p>
                </div>
              )}
            </div>
          )}

          <Button 
            onClick={handleProcess}
            disabled={!selectedFile || isProcessing || (operation === 'join' && !joinFile)}
            className="w-full"
          >
            {isProcessing ? 'Processing...' : 
             operation === 'cut' ? 'Cut Audio' : 'Join Audio Files'}
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