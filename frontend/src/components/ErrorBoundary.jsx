import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo)
    this.setState({ errorInfo })
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.hash = "#/"
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f0d14',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#7c6ff0' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#e8e6f4', maxWidth: '500px', marginBottom: '1rem', lineHeight: '1.6' }}>
            An unexpected error occurred during rendering.
          </p>
          {this.state.error && (
            <div style={{
              background: '#23212f',
              border: '1px solid #3a3848',
              borderRadius: '8px',
              padding: '1rem',
              maxWidth: '800px',
              width: '100%',
              margin: '1rem 0',
              textAlign: 'left',
              overflowX: 'auto',
              color: '#ff6b6b',
              fontSize: '0.9rem',
              fontFamily: 'monospace'
            }}>
              <strong>Error:</strong> {this.state.error.toString()}
              {this.state.errorInfo?.componentStack && (
                <pre style={{ marginTop: '0.5rem', color: '#d8d4ec', fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>
          )}
          <button
            onClick={this.handleReload}
            style={{
              padding: '12px 24px',
              backgroundColor: '#7c6ff0',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Reload EXTrack
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
