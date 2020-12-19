import React from 'react';

//import ApiProgress from '../shared/ApiProgress';
import LoginPage from '../pages/LoginPage';
import UserSignupPage from '../pages/UserSignupPage';
import LanguageSelector from '../components/LanguageSelector';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import { HashRouter, Route , Redirect, Switch} from 'react-router-dom';
import {} from  'reactstrap';
import TopBar from '../components/TopBar';


class App extends React.Component {

/* topbar ın istediği state i app a tasıyarak ve app in burdaki değişimlerini loginpage tasıyarak 
  bagımsız componentler arası etkileşim sağlayabildik */
  
  //topbar dan taşıdık.
  state={
    isLoggedIn: false,
    username: undefined
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

  render(){
    
    const {isLoggedIn, username} = this.state;
    return (
      <div>
      <HashRouter>
         <TopBar username={username} isLoggedIn={isLoggedIn} onLogoutSuccess={this.onLogoutSuccess}/>
          <Switch>
          <Route exact path="/" component = {HomePage} />
          <Route 
            path="/login" 
            component = { props => {
              return <LoginPage {...props}  onLoginSuccess={this.onLoginSuccess} />
            }} />
          <Route path="/signup" component = {UserSignupPage} />
          <Route path="/user/:username" component = {UserPage} />
          <Redirect to="/" />
          </Switch>
       </HashRouter>
       <LanguageSelector />
      </div>
    )

  }
  
}

export default App;
