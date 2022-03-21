import axios  from "./axios";


const login =  async (data) => {
    let {username, password} = data;
    return axios.post("/auth/login", {username, password});
}



export default {login};


