import axios from "axios";


const baseURL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({ baseURL });


api.interceptors.request.use((config) => {
  const saved = localStorage.getItem("JWT_TOKEN");
  const token = saved ? JSON.parse(saved) : null;


  if (token?.accessToken) {
    config.headers["Authorization"] = `Bearer ${token.accessToken}`;
  }

  return config;
}, (error) => Promise.reject(error));


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const saved = localStorage.getItem("JWT_TOKEN");
      const token = saved ? JSON.parse(saved) : null;
        console.log("Refresh working")
      try {
        console.log(token?.refreshToken)
        const res = await axios.post(`${baseURL}/api/auth/public/refresh`, {
          refreshToken: token?.refreshToken,
        });

        const updatedToken = {
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token || token?.refreshToken,
        };

        localStorage.setItem("JWT_TOKEN", JSON.stringify(updatedToken));


        originalRequest.headers["Authorization"] = `Bearer ${updatedToken.accessToken}`;
        return api(originalRequest);
      } catch (err) {

        localStorage.removeItem("JWT_TOKEN");
        console.log(err)
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
