import axiosInstance from "./axiosInstance.ts";

interface FilmSimilar {
    id: number;
    title: string;
}

const fetchSimilar = async (filmId: string): Promise<FilmSimilar[]> => {
    try {
        const { data } = await axiosInstance.get(`/movie/${filmId}/similar`);
        return data.results;
    } catch (error) {
        throw new Error("Failed to fetch similar films");
    }
};

export default fetchSimilar;
