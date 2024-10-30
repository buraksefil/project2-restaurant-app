import axios from "axios";

class AuthService {
  constructor() {

    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:80",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
    // same as
    // return axios.post("http://149.100.138.125:6001/auth/login");
  };

  signup = (requestBody) => {
    return this.api.post("/auth/signup", requestBody);
    // same as
    // return axios.post("http://149.100.138.125:6001/auth/singup");
  };

  verify = () => {
    return this.api.get("/auth/verify");
    // same as
    // return axios.post("http://149.100.138.125:6001/auth/verify");
  };
}

// Create one instance (object) of the service
const authService = new AuthService();

export default authService;