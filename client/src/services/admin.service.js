import axios from "./axios";


const createEvent = async (data) => {
    let { name, backgroundImage, isPaid } = data;
    return axios.post("/event", { name, backgroundImage, isPaid });
}



const deleteEvent = async (name) => {
    return axios.delete("/event/" + name);
}

const getAllEvents = async () => {
    return (await axios.get("/event")).data;
}

const getEvent = (name) => async (dispatch) => {
    return axios.get("/event/" + name);
}

const updateEvent = (data) => {
    let { name, backgroundImage, isPaid,id } = data;
    console.log("updateEvent", data);
    return axios.put("/event/" + name, { id,name, backgroundImage, isPaid });
}


const uploadImage = async (file) => {
    console.log("UPLOAD IMAGE START 2");
    const formData = new FormData();
    formData.append("image", file);
    return axios.post("/event/uploadBG", formData,{
        headers: {
            "Content-Type": "multipart/form-data"
        }, 
        onUploadProgress: progressEvent => {
            console.log(progressEvent.loaded / progressEvent.total);
        }
    });
}

const createUser = async (data) => {
    let { name, username, password, phone } = data;
    return axios.post("/user/createUser", { name, username, password, phone, role:'uploader' });
}

const getSubUsers = async () => {
    return (await axios.get("/user/subUsers")).data;
}

const deleteSubUser = async (id) => {
    return axios.delete("/user/" + id);
}


export default { deleteSubUser,createUser,getSubUsers,createEvent, deleteEvent, getAllEvents, getEvent, updateEvent, uploadImage };


