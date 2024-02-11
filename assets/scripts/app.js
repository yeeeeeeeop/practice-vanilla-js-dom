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
// const inputTitleEl = document.getElementById('title');
// const inputImageUrlEl = document.getElementById('image-url');
// const inputRatingEl = document.getElementById('rating');
const inputEls = document.querySelectorAll('input');

// ---------- variables ----------
const movies = [];

// ---------- handlers ----------
const toggleBackdrop = () => {
  backdropEl.classList.toggle('visible');
};

const toggleMovieModal = () => {
  addMovieModalEl.classList.toggle('visible');
  toggleBackdrop();
};

const backdropClickHandler = () => {
  toggleMovieModal();
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
};

// ---------- event listeners ----------
startAddMovieButtonEl.addEventListener('click', toggleMovieModal);
backdropEl.addEventListener('click', backdropClickHandler);
cancelAddMovieButtonEl.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButtonEl.addEventListener('click', addMovieHandler);
