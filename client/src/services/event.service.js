import axios  from "./axios";


export const search = (data) => async (dispatch) => {
    let formData = new FormData();
    formData.append("selfie", data.selfie);
    formData.append("event", data.event);
    return axios.post("/rekognition/searchFace", data)
}