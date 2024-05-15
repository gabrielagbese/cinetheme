import React from "react";
import { useQuery } from "@tanstack/react-query";
import fetchRecommendations from "../api/fetchRecommendations";

interface FilmRecommendation {
    id: number;
    title: string;
}

interface FilmRecommendationsProps {
    filmId: string;
}

const FilmRecommendations: React.FC<FilmRecommendationsProps> = ({
    filmId,
}) => {
    const { data, error, isLoading } = useQuery<FilmRecommendation[], Error>({
        queryKey: ["recommendations", filmId],
        queryFn: () => fetchRecommendations(filmId),
    });

    if (isLoading) {
        return <div>Loading recommendations for film ID {filmId}...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h3>Recommendations for {filmId}:</h3>
            <ul>
                {data?.map((rec: FilmRecommendation) => (
                    <li key={rec.id}>{rec.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default FilmRecommendations;
