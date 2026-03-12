import { Component } from "react";

class ErrorBoundary extends Component{
    constructor(props){
        super(props)
        this.state = { hasError: false, error: null, errorInfo:null}
    }

    static getDerivedStateFromError(error){
        return { hasError:true,error:error}
    }

    render() {
        if (this.state.hasError) {
            return  <h1>{this.props.fallback}</h1> || <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;