import axios from "./axios";

export const uploadSelectedPhotos = async (photos, folder) => {
  let formData = new FormData();
  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    formData.append("photos[]", photo);
  }
    formData.append("folder", folder);
    return axios.post("/s3/upload", formData);
};

export const fetchAvailableEvents = async () => {
  return axios.get("/event/userEvents");
}

export const getUploadedPhotos = async (eventName) => {
  return (await axios.get(`/s3/getAll/${eventName}`));
}