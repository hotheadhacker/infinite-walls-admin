import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  reloadPage = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex h-100 w-100 align-items-center justify-content-center position-fixed">
          Loading ...! Please wait.
          {this.reloadPage()}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
