# Movie Database v3 (s11d3)

Ödevde istenen dosyalar `src/` altında:

- `App.jsx` — route’lar, `deleteMovie`, `addToFavorites`, dark mode (`useLocalStorage('s11d3', true)`), favori listesi
- `components/EditMovieForm.jsx` — `GET`/`PUT`, `useParams`, yönlendirme
- `components/AddMovieForm.jsx` — `POST /movies`, liste güncelleme
- `components/Movie.jsx` — sil butonu, `deleteMovie`, favori
- `components/MovieList.jsx`, `MovieHeader.jsx`, `FavoriteMovieList.jsx`
- `hooks/useLocalStorage.jsx`

Kendi CRA projenizde bu dosyaları aynı yollara kopyalayın; `react-router-dom` **v5** (`Switch`, `useHistory`) ve `axios` kurulu olsun. Giriş noktanızda uygulama `BrowserRouter` ile sarılı olmalı.

API tabanı: `https://nextgen-project.onrender.com/api/s11d3/movies`
