import axios from "./axios";

const login = async (data) => {
  let { username, password } = data;
  return (await axios.post("/auth/login", { username, password })).data;
};

export default { login };
