import axios from 'axios';

// .post(url,data,config)

export const signup = body => {
    return axios.post('/api/1.0/users', body );
};

export const login = creds =>{
    return axios.post('/api/1.0/auth', {},{auth: creds }); 
    //parametreler: path / reqeust body /config: {auth:}
};

export const changeLanguage = language => {
    axios.defaults.headers['accept-language']= language;
};