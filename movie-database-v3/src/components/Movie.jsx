import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const API = 'https://nextgen-project.onrender.com/api/s11d3/movies';

const Movie = ({ addToFavorites, deleteMovie }) => {
  const { id } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  }, [id]);

  const handleDelete = () => {
    if (!movie) return;
    const idToRemove = movie.id;
    history.push('/movies');
    deleteMovie(idToRemove);
  };

  if (!movie) {
    return (
      <div className="bg-white rounded-md shadow flex-1 p-5 dark:bg-slate-800 dark:text-white">
        Yükleniyor…
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow flex-1 dark:bg-slate-800 dark:text-white">
      <div className="p-5 pb-3 border-b border-zinc-200">
        <h4 className="text-xl font-bold">{`${movie.title} Detayları`}</h4>
        <Link
          to={`/movies/${movie.id}`}
          className="mt-1 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Detay
        </Link>
      </div>
      <div className="px-5 py-3">
        <div className="py-1 flex">
          <div className="view-label">Title</div>
          <div className="flex-1">{movie.title}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Yönetmen</div>
          <div className="flex-1">{movie.director}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Tür</div>
          <div className="flex-1">{movie.genre}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Metascore</div>
          <div className="flex-1">{movie.metascore}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Açıklama</div>
          <p className="flex-1">{movie.description}</p>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-zinc-200 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          className="myButton bg-blue-600 hover:bg-blue-500 dark:bg-blue-200 dark:hover:bg-blue-400 dark:text-slate-800"
          onClick={() => addToFavorites(movie)}
        >
          Favorilere ekle
        </button>
        <Link
          to={`/movies/edit/${movie.id}`}
          className="myButton bg-blue-600 hover:bg-blue-500 dark:bg-blue-200 dark:hover:bg-blue-400 dark:text-slate-800"
        >
          Edit
        </Link>
        <button
          type="button"
          className="myButton bg-red-600 hover:bg-red-500 dark:bg-red-400 dark:hover:bg-red-300 dark:text-slate-900"
          onClick={handleDelete}
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default Movie;
