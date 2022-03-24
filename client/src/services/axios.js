import axios from 'axios';
//const store = require("../app/store");


export const baseURL = "http://192.168.1.43:3001";

const instance = axios.create({
    baseURL
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