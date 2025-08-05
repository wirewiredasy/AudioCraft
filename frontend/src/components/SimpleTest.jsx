import React from 'react'

const SimpleTest = () => {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f0f0f0',
      margin: '20px',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '16px' }}>
        Frontend Test Component
      </h1>
      <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.5' }}>
        This is a simple test component to verify React is working properly.
        If you can see this, React is rendering correctly.
      </p>
      <button 
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          marginTop: '16px'
        }}
        onClick={() => alert('Button clicked! React is working!')}
      >
        Test Button
      </button>
    </div>
  )
}

export default SimpleTest