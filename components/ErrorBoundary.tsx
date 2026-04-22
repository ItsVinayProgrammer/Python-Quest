import React from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
}

/**
 * Prevents rendering failures in one screen from crashing the full app shell.
 */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: unknown) {
        console.error('Unhandled UI error:', error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="rounded-xl border border-[var(--color-danger)]/40 bg-[var(--color-danger-muted)] p-6 text-center">
                    <h2 className="text-xl font-bold text-[var(--color-text-main)]">Something went wrong</h2>
                    <p className="mt-2 text-[var(--color-text-muted)]">
                        Reload the page to continue. Your local progress is still stored.
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
