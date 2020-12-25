// BU COMPONENT UYGULAMANIN GÜNCEL VERSİYONUNDA KULLANILMIYOR
// HOOKS UN USECONTEXT KULLANIMINI PRATİK HALE GETİRMEK İÇİN KULLANILDI
// CONTEXT YERINE REDUX KULLANDIK
import React, { Component } from 'react'

export const Authentication= React.createContext(); //Contexti tanımlamak için kull. bir obje oluşturduk.

 class AuthenticationContext extends Component {

    //bu componenet uyg nın en tepesine index.js içerisine konumlandırcaz
    //statefull comp. , uygulamanın ihtiyac duyduğu global state i bunun içerisinde tutulacak
    
    state={
        isLoggedIn: false,
        username: undefined,
        displayName:undefined,
        image: undefined,
        password: undefined
      } 

      onLoginSuccess = authState =>{
        this.setState({
          ...authState,
          /* 
          username: authState.username,
          displayName: authState.displayName,
          password: authState.password,
          image:  authState.image */

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
           <Authentication.Provider value={{
             state: {...this.state},
             onLoginSuccess: this.onLoginSuccess,
             onLogoutSuccess:this.onLogoutSuccess
           }}>
              
              {this.props.children
              /* index.js içerisinde, App.js i child olarak vereceğiz */}  /

           </Authentication.Provider>
        )
    }
}
export default AuthenticationContext;