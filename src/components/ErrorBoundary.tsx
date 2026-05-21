import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRepair = () => {
    // Attempt to auto-repair by resetting the error boundary state.
    console.log("Attempting auto repair...");
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div style={{
          padding: '2rem',
          margin: '2rem auto',
          maxWidth: '600px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h2 style={{ color: '#E8421A', marginTop: 0 }}>Es ist ein unerwarteter Fehler aufgetreten.</h2>
          <p style={{ color: '#666', lineHeight: 1.5 }}>
            Das System hat ein Problem beim Rendern der Website festgestellt.
            Keine Sorge, wir können versuchen, das Problem automatisch zu beheben.
          </p>
          {this.state.error && (
            <pre style={{
              backgroundColor: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              overflowX: 'auto',
              fontSize: '12px',
              color: '#333'
            }}>
              {this.state.error.message}
            </pre>
          )}
          <button
            onClick={this.handleRepair}
            style={{
              backgroundColor: '#1A2B4C',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '1rem'
            }}
          >
            Auto Repair starten
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
