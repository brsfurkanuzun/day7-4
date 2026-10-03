import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const API = 'https://nextgen-project.onrender.com/api/s11d3/movies';

const EditMovieForm = ({ setMovies }) => {
  const { id } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    genre: '',
    metascore: 0,
    description: '',
  });

  useEffect(() => {
    axios
      .get(`${API}/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  }, [id]);

  const handleChange = (e) => {
    const raw = e.target.value;
    const value = e.target.name === 'metascore' ? Number(raw) : raw;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API}/${id}`, movie)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setMovies(res.data);
        } else if (res.data && res.data.id != null) {
          setMovies((prev) => prev.map((m) => (String(m.id) === String(res.data.id) ? res.data : m)));
        }
        history.push(`/movies/${id}`);
      })
      .catch((err) => console.log(err));
  };

  const { title, director, genre, metascore, description } = movie;

  return (
    <div className="bg-white rounded-md shadow flex-1 dark:bg-slate-800 dark:text-white">
      <form onSubmit={handleSubmit}>
        <div className="p-5 pb-3 border-b border-zinc-200">
          <h4 className="text-xl font-bold">
            {title ? `${title} Detayları` : 'Yükleniyor…'}
          </h4>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Film düzenleme</p>
        </div>
        <div className="px-5 py-3">
          <div className="py-2">
            <label htmlFor="title" className="block pb-1 text-lg">
              Title
            </label>
            <input
              className="dark:bg-slate-800 dark:text-white"
              value={title}
              onChange={handleChange}
              name="title"
              id="title"
              type="text"
            />
          </div>
          <div className="py-2">
            <label htmlFor="director" className="block pb-1 text-lg">
              Director
            </label>
            <input
              className="dark:bg-slate-800 dark:text-white"
              value={director}
              onChange={handleChange}
              name="director"
              id="director"
              type="text"
            />
          </div>
          <div className="py-2">
            <label htmlFor="genre" className="block pb-1 text-lg">
              Genre
            </label>
            <input
              className="dark:bg-slate-800 dark:text-white"
              value={genre}
              onChange={handleChange}
              name="genre"
              id="genre"
              type="text"
            />
          </div>
          <div className="py-2">
            <label htmlFor="metascore" className="block pb-1 text-lg">
              Metascore
            </label>
            <input
              className="dark:bg-slate-800 dark:text-white"
              value={metascore}
              onChange={handleChange}
              name="metascore"
              id="metascore"
              type="number"
            />
          </div>
          <div className="py-2">
            <label htmlFor="description" className="block pb-1 text-lg ">
              Description
            </label>
            <textarea
              className="dark:bg-slate-800 dark:text-white"
              value={description}
              onChange={handleChange}
              name="description"
              id="description"
            />
          </div>
        </div>
        <div className="px-5 py-4 border-t border-zinc-200 flex justify-end gap-2">
          <Link to={`/movies/${id}`} className="myButton bg-zinc-500">
            Vazgeç
          </Link>
          <button type="submit" className="myButton bg-green-700 hover:bg-green-600">
            Değişiklikleri Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovieForm;
