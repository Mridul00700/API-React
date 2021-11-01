import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [data, setData] = useState([]);

  const fetchMovies = async () => {
    const movieData = await fetch('https://swapi.dev/api/films');
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
  }




  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {data.length > 0 ? <MoviesList movies={data} /> : 'Please Click on Fetch Movies'}
      </section>
    </React.Fragment>
  );
}

export default App;
