import axiosInstance from "./axiosInstance.ts";

interface FilmRecommendation {
    id: number;
    title: string;
}

const fetchRecommendations = async (
    filmId: string
): Promise<FilmRecommendation[]> => {
    const recommendations: FilmRecommendation[] = [];
    let page = 1;
    let totalPages = 1;

    // Fetch all pages of recommendations
    while (page <= totalPages) {
        const { data } = await axiosInstance.get(
            `/movie/${filmId}/recommendations`,
            {
                params: {
                    page,
                },
            }
        );
        recommendations.push(...data.results);
        totalPages = data.total_pages;
        page++;
    }

    return recommendations;
};

export default fetchRecommendations;
