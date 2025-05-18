import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const withErrorBoundary = (
  WrappedComponent: React.FC,
  fallback?: ReactNode
): React.FC => {
  return () => {
    class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
      state = { hasError: false };

      static getDerivedStateFromError() {
        return { hasError: true };
      }

      resetError = () => this.setState({ hasError: false });

      render() {
        if (this.state.hasError) {
          return fallback || <ErrorFallback resetError={this.resetError} />;
        }
        return <WrappedComponent />;
      }
    }

    const ErrorFallback = ({ resetError }: { resetError: () => void }) => {
      const navigate = useNavigate();

      const handleGoHome = () => {
        resetError();
        navigate("/");
      };

      return (
        <div className="error-fallback">
          <h2>Something went wrong.</h2>
          <button onClick={handleGoHome}>Go Home</button>
        </div>
      );
    };

    return <ErrorBoundary />;
  };
};

export default withErrorBoundary;
