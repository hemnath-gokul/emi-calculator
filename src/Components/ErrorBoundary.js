import React from "react";
import { Alert, Box, Typography } from "@mui/material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Keep this log for production debugging (e.g. Vercel browser logs).
    // eslint-disable-next-line no-console
    console.error("UI crashed inside ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={2}>
          <Alert severity="error">
            <Typography variant="subtitle1">Something went wrong.</Typography>
            <Typography variant="body2">
              Please refresh or update the input values.
            </Typography>
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
