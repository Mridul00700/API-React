import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const movieData = await fetch('https://swapi.dev/api/films/');

      if (!movieData.ok) {
        throw new Error("Something went wrong here!");
      }
      const movieObj = await movieData.json();

      const transformedData = movieObj.results.map(movie => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl
        }
      })
      setData(transformedData);
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false); // Always set the loading as false. 
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies])

  let content = <p></p>;

  if (data.length > 0)
    content = <MoviesList movies={data} />

  if (isLoading)
    content = <p>Loading ...</p>
  if (error)
    content = <p>{error}</p>
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
