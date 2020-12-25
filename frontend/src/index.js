import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import App from './container/App';
// import AuthenticationContext from './shared/AuthenticationContext';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore();

//provider ı çalıştırmak için store objesi vermek şart
ReactDOM.render(
  <Provider store={ store }>  
    {/* <AuthenticationContext> */}
          <App/> 
    {/* </AuthenticationContext>, */}
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
