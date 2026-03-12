import { Component } from "react";

class ErrorBoundary extends Component{
    constructor(props){
        super(props)
        this.state = { hasError: false, error: null, errorInfo:null}
    }

    static getDerivedStateFromError(error){
        return { hasError:true,error:error}
    }

    render(){
        if(this.state.hasError){
            return(
                <>
            <h1>An error has occured</h1>
            <h3>{this.state.error.message}</h3>
            <h2>{this.props.fallback}</h2>
            </>
            ) 
        } 
        return this.props.children;
    }
}

export default ErrorBoundary;