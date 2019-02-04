import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    return hasError ? (
      <div>
        error:
        {' '}
        {error}
. errorInfo:
        {' '}
        {errorInfo}
      </div>
    ) : (
      this.props.children
    );
  }
}
