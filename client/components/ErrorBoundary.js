import React, { Component } from 'react';

import Typography from "@material-ui/core/Typography";

export class ErrorBoundary extends Component {

  constructor(props) {
    super(props)

    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true
    }
  }

  render() {
    const {priorTicker} = this.props
    if (this.state.hasError) {
      return <Typography variant="p">Apologies, something went wrong when trying to load the following stock ticker: {priorTicker.toUpperCase()}. Please refresh the page to continue. </Typography>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
