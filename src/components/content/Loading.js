import React, { Component } from 'react' ;

export class LoadingComponent extends Component{
    render(){
        return (
            <div className="loading p-2">
                <div className="dot dot-1"></div>
                <div className="ml-1 dot dot-2"></div>
                <div className="ml-1 dot dot-3"></div>
            </div>
        ) ;
    }
}