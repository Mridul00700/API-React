import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const movieData = await fetch('https://swapi.dev/api/film/');

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
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && error}
        {data.length > 0 ? <MoviesList movies={data} /> : isLoading ? 'Loading...' : !error ? 'Please Click on Fetch Movies' : ''}
      </section>
    </React.Fragment>
  );
}

export default App;
