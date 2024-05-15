import React from "react";
import { useQueries } from "@tanstack/react-query";
import fetchRecommendations from "../api/fetchRecommendations";

interface FilmRecommendation {
    id: number;
    title: string;
    count?: number; // Adding count as an optional property
}

interface FilmComparisonProps {
    filmIds: string[];
}

const FilmComparison: React.FC<FilmComparisonProps> = ({ filmIds }) => {
    const queries = useQueries({
        queries: filmIds.map((filmId) => ({
            queryKey: ["recommendations", filmId],
            queryFn: () => fetchRecommendations(filmId),
        })),
    });

    const isLoading = queries.some((query) => query.isLoading);
    const isError = queries.some((query) => query.isError);

    if (isLoading) {
        return <div>Loading recommendations...</div>;
    }

    if (isError) {
        return <div>Error loading recommendations.</div>;
    }

    // Aggregate all recommendations
    const allRecommendations = queries.flatMap((query) => query.data || []);

    // Count occurrences of each film
    const filmCount = allRecommendations.reduce(
        (
            acc: { [key: number]: FilmRecommendation & { count: number } },
            rec
        ) => {
            if (acc[rec.id]) {
                acc[rec.id].count++;
            } else {
                acc[rec.id] = { ...rec, count: 1 };
            }
            return acc;
        },
        {}
    );

    // Convert filmCount to an array and sort by count in descending order
    const sortedFilms = Object.values(filmCount).sort(
        (a, b) => b.count - a.count
    );

    return (
        <div>
            <h2>All Recommendations:</h2>
            {sortedFilms.length > 0 ? (
                <ul>
                    {sortedFilms.map((film) => (
                        <li key={film.id}>
                            {film.title} (Appears in {film.count} list
                            {film.count > 1 ? "s" : ""})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recommendations found.</p>
            )}
        </div>
    );
};

export default FilmComparison;
