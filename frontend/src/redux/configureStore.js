import { applyMiddleware, createStore } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import thunk from 'redux-thunk';


const secureLS = new SecureLS();

const getStateFromStorage = () => {

//   const userAuth = localStorage.getItem('user-auth');
const userAuth = secureLS.get('user-auth');

  let stateInLocalState= {
    isLoggedIn: false,
    username: undefined,
    displayName:undefined,
    image: undefined,
    password: undefined

  };

  if(userAuth){
    try{
        // stateInLocalState = JSON.parse(userAuth);
        return userAuth;
    } catch (error) {

    }   
  }

  return stateInLocalState;
}


const updateStateInStorage = newState => {
    secureLS.set('user-auth', newState);
    // localStorage.setItem('user-auth', JSON.stringify(newState));
}

const configureStore = () => {
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = createStore(authReducer, getStateFromStorage(), applyMiddleware(thunk));

  store.subscribe(()=> {
    updateStateInStorage(store.getState());
  });

  return store;
}
    
// reducer fonks is must

export default configureStore;