import * as ACTIONS from './Constants';
import { login, signup } from '../api/ApiCalls';

export const logoutSuccess = () => { 
    return {
        type: ACTIONS.LOGOUT_SUCCESS
    };
};

export const loginSuccess = (authState) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    };
};


export const loginHandler = (credentials) => {
   return async function(dispatch) {
        const response = await login(credentials);
        const authState = {
             ...response.data,
                password: credentials.password
            /*  username: username,
                displayName: response.data.displayName ,  //response dan erişiyoruz, response data 3 ünü de veriyor
                image:response.data.ima */
         };
        dispatch(loginSuccess(authState));
        return response;
    };
};

//asenkron aksiyon ekledik // signup  dan sonra login olmak için
export const signupHandler = (user) => {
    return async function (dispatch){
        const response = await signup(user);
        await dispatch(loginHandler(user))
        return response;
    };
};