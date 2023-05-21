// Fetch movies from the API based on the search term
// async function fetchMovies(searchTerm) {
//   const response = await fetch(
//     `http://www.omdbapi.com/?s=${encodeURIComponent(
//       searchTerm
//     )}&apikey=5adf1410`
//   );
//   const data = await response.json();

//   if (data.Response === 'True') {
//     const movies = await Promise.all(
//       data.Search.map(async movie => {
//         const response = await fetch(
//           `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=5adf1410`
//         );
//         const fullMovieData = await response.json();
//         return fullMovieData;
//       })
//     );
//     renderMovieContainer(movies); // Pass all movie results to the rendering function
//   } else {
//     console.log(data.Error);
//     // you can render an error message here
//   }
// }

async function fetchMovies(searchTerm) {
  const response = await fetch(
    `http://www.omdbapi.com/?s=${encodeURIComponent(
      searchTerm
    )}&apikey=5adf1410`
  );
  const data = await response.json();
  if (data.Response === 'True') {
    const movies = await Promise.all(
      data.Search.map(async movie => {
        const response = await fetch(
          `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=5adf1410`
        );
        const fullMovieData = await response.json();
        return fullMovieData;
      })
    );
    renderMovieContainer(movies);
  } else {
    console.log('no mas amigo');
  }
}

// Render the movie data
function renderMovieContainer(movies) {
  let feedHtml = '';

  for (let movie of movies) {
    feedHtml += `
        <div class="movie-container" id="movie-container">
          <div class="poster-container">
            <img
              src="${movie.Poster}"
              alt=""
              class="poster"
              id="poster"
            />
          </div>
          <div class="movie-content">
            <div class="movie-headline" id="movie-headline">
              <h1 class="movie-title" id="movie-title">${movie.Title}</h1>
              <h1 class="movie-rating" id="movie-rating">
                <i class="fa-solid fa-star" style="color: #fec654">${movie.imdbRating}</i>
              </h1>
            </div>
            <div class="movie-info" id="movie-info">
              <h4 class="movie-runtime" id="movie-runtime">${movie.Runtime}</h4>
              <h4 class="movie-genre" id="movie-genre">${movie.Genre}</h4>
              <div class="watchlist-container">
                <i class="fa-solid fa-circle-plus" data-watch=""></i>
                <h4 class="add-watchlist">Watchlist</h4>
              </div>
            </div>
            <p class="movie-description" id="movie-description">
              ${movie.Plot}
            </p>
          </div>
        </div>`;
  }

  document.getElementById('main-container').innerHTML = feedHtml;
}

// Event listeners for the search input and button
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-btn');

searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    fetchMovies(searchInput.value);
  }
});

searchButton.addEventListener('click', function () {
  fetchMovies(searchInput.value);
});
