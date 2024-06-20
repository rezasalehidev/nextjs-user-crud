import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // initialize the error state
        this.state = { hasError: false };
    }

    // if an error happened, set the state to true
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: unknown, errorInfo: unknown) {
        // send error to somewhere here
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat">
                        <div className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
                            <div className="text-9xl font-bold text-indigo-600 mb-4">Error</div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-6">Oops!</h1>
                            <a className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                                Go Back Home
                            </a>
                        </div>
                    </div>
                </>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary