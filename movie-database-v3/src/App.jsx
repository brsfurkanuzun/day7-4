import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from './components/EditMovieForm';
import AddMovieForm from './components/AddMovieForm';
import MovieHeader from './components/MovieHeader';
import useLocalStorage from './hooks/useLocalStorage';

const API = 'https://nextgen-project.onrender.com/api/s11d3/movies';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useLocalStorage('s11d3', true);

  useEffect(() => {
    axios
      .get(API)
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!movies.length) return;
    setFavorites((fav) =>
      fav.filter((f) => movies.some((m) => String(m.id) === String(f.id)))
    );
  }, [movies]);

  const deleteMovie = (id) => {
    setMovies((prev) => prev.filter((m) => String(m.id) !== String(id)));
    setFavorites((fav) => fav.filter((m) => String(m.id) !== String(id)));
    return axios.delete(`${API}/${id}`).then((res) => {
      if (Array.isArray(res.data)) {
        setMovies(res.data);
      }
    });
  };

  const addToFavorites = (movie) => {
    if (!movie || movie.id == null) return;
    setFavorites((prev) =>
      prev.some((m) => String(m.id) === String(movie.id)) ? prev : [...prev, movie]
    );
  };

  const darkOn = darkMode !== false;

  const rootClass = darkOn ? 'dark bg-slate-900 h-screen' : '';

  return (
    <div id="main-container" className={rootClass}>
      <nav className="bg-zinc-800 text-white px-6 py-3 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
          <label className="inline-flex cursor-pointer select-none items-center gap-3 font-medium text-gray-900 dark:text-gray-300">
            <div className="relative h-6 w-11 shrink-0">
              <input
                id="dark-mode-input"
                type="checkbox"
                className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                data-testid="darkMode-toggle"
                checked={darkOn}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <div
                className="pointer-events-none absolute inset-0 h-6 w-11 rounded-full bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-gray-700 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] dark:border-gray-600"
                aria-hidden
              />
            </div>
            <span>{darkOn ? 'Dark Mode On' : 'Dark Mode Off'}</span>
          </label>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 sm:max-w-[250px] p-5 pr-5 bg-white shadow rounded-md dark:bg-slate-800 dark:border-slate-700 ">
            <h5 className="font-bold dark:text-gray-200">Favori Filmler</h5>
            <div className="pt-3 text-sm">
              {favorites.map((movie) => (
                <Link
                  key={movie.id}
                  data-testid="fav-movie"
                  className="py-1 flex gap-2 justify-between dark:text-white"
                  to={`/movies/${movie.id}`}
                >
                  {movie.title}
                </Link>
              ))}
            </div>
          </div>
          <Switch>
            <Route exact path="/movies/edit/:id" render={() => <EditMovieForm setMovies={setMovies} />} />
            <Route exact path="/movies/add" render={() => <AddMovieForm setMovies={setMovies} />} />
            <Route
              exact
              path="/movies/:id"
              render={() => <Movie addToFavorites={addToFavorites} deleteMovie={deleteMovie} />}
            />
            <Route exact path="/movies" render={() => <MovieList movies={movies} />} />
            <Route exact path="/" render={() => <Redirect to="/movies" />} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
