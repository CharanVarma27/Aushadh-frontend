import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', background: '#fee2e2', color: '#991b1b', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Dashboard Crashed</h1>
          <p>Please take a screenshot of this error and show it to Charan:</p>
          <div style={{ whiteSpace: 'pre-wrap', background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #fca5a5', overflowX: 'auto' }}>
            <strong>{this.state.error?.toString()}</strong>
          </div>
          <div style={{ whiteSpace: 'pre-wrap', background: 'white', padding: '20px', marginTop: '10px', borderRadius: '8px', border: '1px solid #fca5a5', overflowX: 'auto', fontSize: '12px' }}>
            {this.state.errorInfo?.componentStack}
          </div>
        </div>
      );
    }
    return this.props.children; 
  }
}
