import axios from "axios";

const pinataAPI = axios.create({
  baseURL: "https://api.pinata.cloud/",
  headers: {
    Authorization: `Bearer ${process.env.PINATA_JWT}`
  }
});

export default pinataAPI;
