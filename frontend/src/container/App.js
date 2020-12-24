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
// import { Authentication } from '../shared/AuthenticationContext';
import { connect } from 'react-redux';

class App extends React.Component {

  // static contextType = Authentication;
  render(){
    // const isLoggedIn= this.context.state.isLoggedIn
    const {isLoggedIn}= this.props;
    return (
      <div>
      <HashRouter>
         <TopBar/>
          <Switch>
          
          <Route exact path="/" component = {HomePage} />
          
          { !isLoggedIn && ( 
          <Route 
            path="/login" 
            component = { LoginPage} 
            /> )
          }
         
          <Route path="/signup" component = {UserSignupPage} />
          
          <Route path="/user/:username"  component={UserPage} />          
          
          <Redirect to="/" />
          </Switch>
       </HashRouter>
       <LanguageSelector />
      </div>
    )

  }
  
}

const mapStateToProps = (store) => {  
  return{
    isLoggedIn: store.isLoggedIn,
  
  };
};

export default connect(mapStateToProps)(App);
