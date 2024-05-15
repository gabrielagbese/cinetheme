import React, { useState, ChangeEvent } from "react";
import FilmRecommendations from "./FilmRecommendations";
import FilmComparison from "./FilmComparison";

const FilmApp: React.FC = () => {
    const [filmId, setFilmId] = useState<string>("");
    const [filmIds, setFilmIds] = useState<string[]>([]);

    const handleAddFilmId = () => {
        if (filmId) {
            setFilmIds([...filmIds, filmId]);
            setFilmId(""); // Clear the input field
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilmId(e.target.value);
    };

    const handleRemoveFilmId = (id: string) => {
        setFilmIds(filmIds.filter((filmId) => filmId !== id));
    };

    return (
        <div>
            <h1>Film ID Collector</h1>
            <input
                type="text"
                value={filmId}
                onChange={handleChange}
                placeholder="Enter film ID"
            />
            <button onClick={handleAddFilmId}>Add Film ID</button>
            <div>
                <h2>Collected Film IDs:</h2>
                <ul>
                    {filmIds.map((id, index) => (
                        <li key={index}>
                            {id}
                            <button onClick={() => handleRemoveFilmId(id)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Recommendations:</h2>
                {filmIds.map((id) => (
                    <FilmRecommendations key={id} filmId={id} />
                ))}
            </div>
            <div>
                <h2>All Recommendations:</h2>
                <FilmComparison filmIds={filmIds} />
            </div>
        </div>
    );
};

export default FilmApp;
