import axios from 'axios';
//const store = require("../app/store");




const instance = axios.create({
    baseURL: 'http://localhost:3000/'
});

//read token from redux



// add token to header
instance.interceptors.request.use(async config => {
    console.log("interceptor");
    const token = localStorage.getItem("token");
    console.log("TOKEN", token);
    if (token) {
        config.headers.authorization = token;
    }
    return config;
},
    error => {
        console.log(error)
    }
);

export default instance;