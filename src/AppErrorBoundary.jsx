import React from "react";

export class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("KSDev render error:", error, info.componentStack);
  }
  render() {
    if (this.state.error)
      return (
        <main className="app-error">
          <div>
            <span className="eyebrow">KSDEV STUDIO</span>
            <h1>The page hit a rendering error.</h1>
            <p>
              Refresh once. If it happens again, share this message with the
              studio developer.
            </p>
            <pre>{this.state.error.message}</pre>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Refresh page
            </button>
          </div>
        </main>
      );
    return this.props.children;
  }
}

export default AppErrorBoundary;
