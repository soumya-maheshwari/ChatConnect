import axios from "axios";

export default axios.create({
  baseURL: "https://chatconnect-oqm1.onrender.com/api/",
  //  baseURL: "http://localhost:5000/api/",
});
