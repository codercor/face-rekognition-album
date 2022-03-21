import axios  from "./axios";


export const search = (data) => {
    let formData = new FormData();
    formData.append("selfie", data.selfie);
    formData.append("folder", data.event);
    console.log(formData.get("selfie"));
    return axios.post("/rekognition/searchFace", formData)
}

export const getEvent = async (data) => {
    let event = await axios.get("/event/" + data)
    return event;
}