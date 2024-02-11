// ---------- elements ----------
// modals
const addMovieModalEl = document.getElementById('add-modal');
const deleteMovieModalEl = document.getElementById('delete-modal');

// buttons
const startAddMovieButtonEl = document.querySelector('header button');
const cancelAddMovieButtonEl = addMovieModalEl.querySelector('.btn--passive');
const confirmAddMovieButtonEl = addMovieModalEl.querySelector('.btn--success');

// overlay
const backdropEl = document.getElementById('backdrop');

// input
const inputEls = document.querySelectorAll('input');

// etc
const entryTextEl = document.getElementById('entry-text');
const movieListEl = document.getElementById('movie-list');

// ---------- variables ----------
const movies = [];

// ---------- handlers ----------
const updateUI = () => {
  if (movies.length === 0) {
    entryTextEl.style.display = 'block';
  } else {
    entryTextEl.style.display = 'none';
  }
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModalEl.classList.remove('visible');
};

const deleteMovie = (movieId) => {
  const movieIndex = movies.findIndex((v) => v.id === movieId);

  movies.splice(movieIndex, 1);
  movieListEl.children[movieIndex].remove();

  closeMovieDeletionModal();
  updateUI();
};

const startDeleteMovieHandler = (movieId) => {
  deleteMovieModalEl.classList.add('visible');
  toggleBackdrop();

  const cancelDeleteButtonEl =
    deleteMovieModalEl.querySelector('.btn--passive');
  let confirmDeleteButtonEl = deleteMovieModalEl.querySelector('.btn--danger');

  confirmDeleteButtonEl.replaceWith(confirmDeleteButtonEl.cloneNode(true));
  confirmDeleteButtonEl = deleteMovieModalEl.querySelector('.btn--danger');

  cancelDeleteButtonEl.removeEventListener('click', closeMovieDeletionModal);

  cancelDeleteButtonEl.addEventListener('click', closeMovieDeletionModal);
  confirmDeleteButtonEl.addEventListener(
    'click',
    deleteMovie.bind(null, movieId),
  );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieEl = document.createElement('li');

  newMovieEl.className = 'movie-element';
  newMovieEl.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}"/>
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;

  newMovieEl.addEventListener('click', startDeleteMovieHandler.bind(null, id));
  movieListEl.append(newMovieEl);
};

const toggleBackdrop = () => {
  backdropEl.classList.toggle('visible');
};

const closeMovieModal = () => {
  addMovieModalEl.classList.remove('visible');
};

const showMovieModal = () => {
  addMovieModalEl.classList.add('visible');
  toggleBackdrop();
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
};

const clearMovieInput = () => {
  for (const inputEl of inputEls) {
    inputEl.value = '';
  }
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
};

const addMovieHandler = () => {
  const titleValue = inputEls[0].value;
  const imageUrlValue = inputEls[1].value;
  const ratingValue = inputEls[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newMovie = {
    id: Date.now().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating,
  );
  updateUI();
};

// ---------- event listeners ----------
startAddMovieButtonEl.addEventListener('click', showMovieModal);
backdropEl.addEventListener('click', backdropClickHandler);
cancelAddMovieButtonEl.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButtonEl.addEventListener('click', addMovieHandler);
