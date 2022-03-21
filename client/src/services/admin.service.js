import axios from "./axios";


const createEvent = async (data) => {
    let { name, backgroundImage, isPaid } = data;
    return axios.post("/event", { name, backgroundImage, isPaid });
}

const deleteEvent = async (name) => {
    return axios.delete("/event/" + name);
}

const getAllEvents = () => async (dispatch) => {
    return axios.get("/event");
}

const getEvent = (name) => async (dispatch) => {
    return axios.get("/event/" + name);
}

const updateEvent = (name, data) => async (dispatch) => {
    let { name, backgroundImage, isPaid } = data;
    return axios.put("/event/" + name, { name, backgroundImage, isPaid });
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

export default { createEvent, deleteEvent, getAllEvents, getEvent, updateEvent, uploadImage };


