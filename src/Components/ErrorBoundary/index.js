import React from 'react';

class ErrorBoundary extends React.Component{

    state = {
        hasError: false,
    };

    static getDerivedStateFromError(error){

        return {hasError: true}

    }

    componentDidCatch(error, errorInfo) {
        console.log(error);
        console.log(errorInfo);
    }

    render(){
        const { hasError } = this.state;
        if(hasError){
            return <h1>Something went wrong</h1>
        }

        return this.props.children;
    }

}


export const withErrorBoundaries = Component => props => <ErrorBoundary>

    <Component {...props}/>

</ErrorBoundary>;
