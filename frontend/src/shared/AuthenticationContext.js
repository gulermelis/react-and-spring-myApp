import React, { Component } from 'react'

export const AUthentication= React.createContext();

 class AuthenticationContext extends Component {

    state={
        isLoggedIn: false,
        username: "user1",
        displayName:undefined,
        image: undefined,
        password: undefined
      } 
    
      //loginpage den çağrılacak fonks.
      onLoginSuccess = username =>{
        this.setState({
          username,
          isLoggedIn: true
        })
      }
    
      onLogoutSuccess =() => {
        this.setState({
          isLoggedIn: false,
          username: undefined
        });
      }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default AuthenticationContext;