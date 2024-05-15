import axios from "axios";

const apiKey = "1048e21dba05cb3a31824d645f6ce6da"; // Replace with your TMDB API key

const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: apiKey,
    },
});

export default axiosInstance;
