import { createStore } from 'redux';
import authReducer from './authReducer'

const loggedInState = {    // initial state
    isLoggedIn: true,
    username: 'user1',
    displayName:'dislay1',
    image: null,
    password: 'P4ssword'
};


const configureStore = () => {
    return createStore(authReducer,loggedInState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}
    
// reducer fonks is must

export default configureStore;