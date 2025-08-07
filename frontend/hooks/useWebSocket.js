import { useEffect, useRef, useState } from 'react'

export const useWebSocket = (url, options = {}) => {
  const [socket, setSocket] = useState(null)
  const [lastMessage, setLastMessage] = useState(null)
  const [readyState, setReadyState] = useState(WebSocket.CONNECTING)
  const [connectionError, setConnectionError] = useState(null)
  
  const shouldReconnect = useRef(true)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = options.maxReconnectAttempts || 5
  const reconnectInterval = options.reconnectInterval || 3000

  const connect = () => {
    try {
      const ws = new WebSocket(url)
      
      ws.onopen = () => {
        setReadyState(WebSocket.OPEN)
        setConnectionError(null)
        reconnectAttempts.current = 0
        
        if (options.onOpen) {
          options.onOpen()
        }
      }
      
      ws.onmessage = (event) => {
        let data
        try {
          data = JSON.parse(event.data)
        } catch {
          data = event.data
        }
        
        setLastMessage(data)
        
        if (options.onMessage) {
          options.onMessage(data)
        }
      }
      
      ws.onerror = (error) => {
        setConnectionError(error)
        console.error('WebSocket error:', error)
        
        if (options.onError) {
          options.onError(error)
        }
      }
      
      ws.onclose = (event) => {
        setReadyState(WebSocket.CLOSED)
        setSocket(null)
        
        if (options.onClose) {
          options.onClose(event)
        }
        
        // Auto-reconnect logic
        if (shouldReconnect.current && 
            reconnectAttempts.current < maxReconnectAttempts &&
            !event.wasClean) {
          
          setTimeout(() => {
            reconnectAttempts.current++
            connect()
          }, reconnectInterval)
        }
      }
      
      setSocket(ws)
      
    } catch (error) {
      setConnectionError(error)
      console.error('Failed to create WebSocket connection:', error)
    }
  }

  const disconnect = () => {
    shouldReconnect.current = false
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close(1000, 'User initiated disconnect')
    }
  }

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const payload = typeof message === 'string' ? message : JSON.stringify(message)
      socket.send(payload)
      return true
    }
    return false
  }

  const sendJsonMessage = (object) => {
    return sendMessage(JSON.stringify(object))
  }

  // Initialize connection
  useEffect(() => {
    if (url) {
      connect()
    }
    
    return () => {
      shouldReconnect.current = false
      if (socket) {
        socket.close()
      }
    }
  }, [url])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      shouldReconnect.current = false
      if (socket) {
        socket.close()
      }
    }
  }, [])

  return {
    socket,
    lastMessage,
    readyState,
    connectionError,
    sendMessage,
    sendJsonMessage,
    disconnect,
    reconnect: connect
  }
}

// Helper hook for job progress WebSocket
export const useJobProgress = (jobId, onProgressUpdate) => {
  const protocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const host = typeof window !== 'undefined' ? window.location.host : 'localhost:5000'
  const wsUrl = `${protocol}//${host}/api/processing/ws/${jobId}`

  const { lastMessage, readyState, connectionError, sendMessage } = useWebSocket(wsUrl, {
    onMessage: (data) => {
      if (data.type === 'progress_update' && onProgressUpdate) {
        onProgressUpdate({
          jobId: data.job_id,
          progress: data.progress,
          status: data.status,
          message: data.message,
          currentStep: data.current_step,
          currentStepNum: data.current_step_num,
          totalSteps: data.total_steps,
          estimatedTimeRemaining: data.estimated_time_remaining,
          timestamp: data.timestamp
        })
      }
    },
    onOpen: () => {
      // Send ping to keep connection alive
      const pingInterval = setInterval(() => {
        sendMessage('ping')
      }, 30000) // Ping every 30 seconds

      return () => clearInterval(pingInterval)
    }
  })

  return {
    isConnected: readyState === WebSocket.OPEN,
    isConnecting: readyState === WebSocket.CONNECTING,
    lastMessage,
    connectionError
  }
}