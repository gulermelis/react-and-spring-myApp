import React, { Component } from 'react'
import axios from 'axios';

function getDisplayName(WrappedComponent){
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withApiProgress( WrappedComponent, apiPath){  //higher order component

    return class extends Component {
        static displayName= `ApiProgress(${getDisplayName(WrappedComponent)})`;
        //static displayName = 'ApiProgress(' + getDisplayName(WrappedComponent) + ')';

        state={
            pendingApiCall: false
        };
    
        componentDidMount(){ //burası interceptorslar için eklendi //ilk defa ekrana gösterileceği zaman cağrılan method
            this.requestInterceptor = axios.interceptors.request.use(request => {
            /*    if(request.url === this.props.path){
                this.setState({  pendingApiCall: true });
               } */
               this.updateApiCallFor(request.url, true);
                return request;
            });
    
            this.responseInterceptor= axios.interceptors.response.use(response => {
                this.updateApiCallFor(response.config.url, false);
                return response;
            }, (error) => {
                this.updateApiCallFor(error.config.url, false);
                throw error;
            })
        }
    
            componentWillUnmount() {
                axios.interceptors.request.eject(this.requestInterceptor);
                axios.interceptors.request.eject( this.responseInterceptor);

            }
    
        updateApiCallFor = (url, inProgress) =>{
            if(url === apiPath){
                this.setState({  pendingApiCall: inProgress });
            }
        }
    
        
    
    
        render() {
            const pendingApiCall = this.state.pendingApiCall || this.props.pendingApiCall;   // signup da sonra lgin oldugunda birbrini ezmesin diye ekledik row 52 ve 54     
            //  return  <div>   {React.cloneElement(this.props.children, { pendingApiCall })}  </div>
            return <WrappedComponent {... this.props} pendingApiCall={pendingApiCall} />
        
        }
    };

}
