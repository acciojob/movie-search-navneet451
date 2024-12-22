import React, { useState } from 'react';
import axios from 'axios';

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    const apiKey = '99eb9fd1';
    const baseUrl = 'http://www.omdbapi.com/';

    const handleSearch = async () => {
        if (!query) {
            setError('Please enter a movie name.');
            setMovies([]);
            return;
        }

        const url = `${baseUrl}?apikey=${apiKey}&s=${encodeURIComponent(query)}`;

        try {
            const response = await axios.get(url);
            if (response.data.Response === 'True') {
                setMovies(response.data.Search);
                setError(null);
            } else {
                setError('Invalid movie name. Please try again.');
                setMovies([]);
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while fetching data.');
            setMovies([]);
        }
    };

    return (
        <div>
            <h1>Movie Search</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter movie title"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {error && <p className="error">{error}</p>}

            <div>
                {movies.length > 0 && (
                    <ul>
                        {movies.map((movie) => (
                            <li key={movie.imdbID} style={{ marginBottom: '20px' }}>
                                <img
                                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
                                    alt={movie.Title}
                                    style={{ width: '100px', marginRight: '10px' }}
                                />
                                <div>
                                    <strong>{movie.Title}</strong> ({movie.Year})
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MovieSearch;
