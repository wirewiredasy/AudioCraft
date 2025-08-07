import React, { useState, useEffect, useRef } from 'react'
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Pause,
  Play,
  Download,
  Trash2,
  RefreshCw,
  Upload,
  Users,
  Activity
} from 'lucide-react'
import { useWebSocket } from '../hooks/useWebSocket'
import { AudioVisualizer } from './AudioVisualizer'

export const ProcessingDashboard = ({ userId }) => {
  const [jobs, setJobs] = useState([])
  const [queueStatus, setQueueStatus] = useState({
    active_tasks: 0,
    scheduled_tasks: 0,
    reserved_tasks: 0,
    total_workers: 0
  })
  const [selectedJob, setSelectedJob] = useState(null)
  const [filter, setFilter] = useState('all') // all, processing, completed, failed
  
  // WebSocket connections for real-time updates
  const jobWebSockets = useRef(new Map())

  // Fetch user jobs
  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/processing/jobs', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setJobs(data)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }

  // Fetch queue status
  const fetchQueueStatus = async () => {
    try {
      const response = await fetch('/api/processing/queue/status', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setQueueStatus(data)
      }
    } catch (error) {
      console.error('Error fetching queue status:', error)
    }
  }

  // Setup WebSocket for job progress
  const setupJobWebSocket = (jobId) => {
    if (jobWebSockets.current.has(jobId)) return

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const wsUrl = `${protocol}//${window.location.host}/api/processing/ws/${jobId}`
    
    const ws = new WebSocket(wsUrl)
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      if (data.type === 'progress_update') {
        setJobs(prevJobs => 
          prevJobs.map(job => 
            job.id === jobId 
              ? { 
                  ...job, 
                  progress: data.progress,
                  status: data.status,
                  current_step: data.current_step,
                  message: data.message
                } 
              : job
          )
        )
      }
    }
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
    
    ws.onclose = () => {
      jobWebSockets.current.delete(jobId)
    }
    
    jobWebSockets.current.set(jobId, ws)
  }

  // Cancel job
  const cancelJob = async (jobId) => {
    try {
      const response = await fetch(`/api/processing/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      
      if (response.ok) {
        fetchJobs()
      }
    } catch (error) {
      console.error('Error cancelling job:', error)
    }
  }

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { 
          color: 'text-yellow-400 bg-yellow-400/20', 
          icon: Clock, 
          label: 'Pending' 
        }
      case 'processing':
        return { 
          color: 'text-blue-400 bg-blue-400/20', 
          icon: Activity, 
          label: 'Processing' 
        }
      case 'completed':
        return { 
          color: 'text-green-400 bg-green-400/20', 
          icon: CheckCircle, 
          label: 'Completed' 
        }
      case 'failed':
        return { 
          color: 'text-red-400 bg-red-400/20', 
          icon: XCircle, 
          label: 'Failed' 
        }
      case 'cancelled':
        return { 
          color: 'text-gray-400 bg-gray-400/20', 
          icon: Pause, 
          label: 'Cancelled' 
        }
      default:
        return { 
          color: 'text-gray-400 bg-gray-400/20', 
          icon: AlertCircle, 
          label: 'Unknown' 
        }
    }
  }

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true
    return job.status === filter
  })

  // Initialize
  useEffect(() => {
    fetchJobs()
    fetchQueueStatus()
    
    const interval = setInterval(() => {
      fetchQueueStatus()
    }, 30000) // Update every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  // Setup WebSocket for processing jobs
  useEffect(() => {
    jobs.forEach(job => {
      if (job.status === 'processing' || job.status === 'pending') {
        setupJobWebSocket(job.id)
      }
    })
    
    return () => {
      // Cleanup WebSocket connections
      jobWebSockets.current.forEach(ws => ws.close())
      jobWebSockets.current.clear()
    }
  }, [jobs])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
            Processing Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Monitor your audio processing jobs and queue status in real-time
          </p>
        </div>

        {/* Queue Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Jobs</p>
                <p className="text-2xl font-bold text-white">{queueStatus.active_tasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Queued Jobs</p>
                <p className="text-2xl font-bold text-white">{queueStatus.scheduled_tasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Workers</p>
                <p className="text-2xl font-bold text-white">{queueStatus.total_workers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Completed Today</p>
                <p className="text-2xl font-bold text-white">
                  {jobs.filter(job => 
                    job.status === 'completed' && 
                    new Date(job.completed_at).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-4">
            {[
              { key: 'all', label: 'All Jobs', count: jobs.length },
              { key: 'processing', label: 'Processing', count: jobs.filter(j => j.status === 'processing').length },
              { key: 'completed', label: 'Completed', count: jobs.filter(j => j.status === 'completed').length },
              { key: 'failed', label: 'Failed', count: jobs.filter(j => j.status === 'failed').length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
              <p className="text-gray-400">
                {filter === 'all' 
                  ? "You haven't processed any audio files yet." 
                  : `No ${filter} jobs found.`
                }
              </p>
            </div>
          ) : (
            filteredJobs.map(job => {
              const statusInfo = getStatusInfo(job.status)
              const StatusIcon = statusInfo.icon
              
              return (
                <div
                  key={job.id}
                  className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:bg-gray-800/70 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${statusInfo.color.split(' ')[1]}`}>
                        <StatusIcon className={`w-5 h-5 ${statusInfo.color.split(' ')[0]}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white capitalize">
                          {job.tool_type.replace('_', ' ')}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Created {new Date(job.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                      
                      {job.status === 'processing' && (
                        <button
                          onClick={() => cancelJob(job.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/20 rounded-lg transition-all"
                          title="Cancel Job"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                      
                      {job.status === 'completed' && job.output_files.length > 0 && (
                        <button
                          className="p-2 text-green-400 hover:text-green-300 hover:bg-green-400/20 rounded-lg transition-all"
                          title="Download Result"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress Bar for Processing Jobs */}
                  {(job.status === 'processing' || job.status === 'pending') && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">
                          {job.current_step || 'Preparing...'}
                        </span>
                        <span className="text-sm text-blue-400">
                          {job.progress?.toFixed(1) || 0}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                          style={{ width: `${job.progress || 0}%` }}
                        />
                      </div>
                      {job.message && (
                        <p className="text-xs text-gray-500 mt-2">{job.message}</p>
                      )}
                    </div>
                  )}
                  
                  {/* Job Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                    <div>
                      <span className="font-medium">Input Files:</span>
                      <span className="ml-2">{job.input_files?.length || 0} files</span>
                    </div>
                    <div>
                      <span className="font-medium">Output Files:</span>
                      <span className="ml-2">{job.output_files?.length || 0} files</span>
                    </div>
                    <div>
                      <span className="font-medium">Processing Time:</span>
                      <span className="ml-2">
                        {job.processing_time 
                          ? `${job.processing_time.toFixed(1)}s` 
                          : 'N/A'
                        }
                      </span>
                    </div>
                  </div>
                  
                  {/* Error Message */}
                  {job.error_message && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm">{job.error_message}</p>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Refresh Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              fetchJobs()
              fetchQueueStatus()
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProcessingDashboard