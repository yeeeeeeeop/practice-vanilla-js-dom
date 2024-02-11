// ---------- elements ----------
// modals
const addMovieModalEl = document.getElementById('add-modal');

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

const renderNewMovieElement = (title, imageUrl, rating) => {
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

  const movieListEl = document.getElementById('movie-list');
  movieListEl.append(newMovieEl);
};

const toggleBackdrop = () => {
  backdropEl.classList.toggle('visible');
};

const toggleMovieModal = () => {
  addMovieModalEl.classList.toggle('visible');
  toggleBackdrop();
};

const backdropClickHandler = () => {
  toggleMovieModal();
  clearMovieInput();
};

const clearMovieInput = () => {
  for (const inputEl of inputEls) {
    inputEl.value = '';
  }
};

const cancelAddMovieHandler = () => {
  toggleMovieModal();
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
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  toggleMovieModal();
  clearMovieInput();
  renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
};

// ---------- event listeners ----------
startAddMovieButtonEl.addEventListener('click', toggleMovieModal);
backdropEl.addEventListener('click', backdropClickHandler);
cancelAddMovieButtonEl.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButtonEl.addEventListener('click', addMovieHandler);
