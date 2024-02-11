// ---------- elements ----------
// modals
const addMovieModalEl = document.getElementById('add-modal');

// buttons
const startAddMovieButtonEl = document.querySelector('header button');
const cancelAddMovieButtonEl = addMovieModalEl.querySelector('.btn--passive');

// overlay
const backdropEl = document.getElementById('backdrop');

// ---------- handlers ----------
const toggleBackdrop = () => {
  backdropEl.classList.toggle('visible');
};

const toggleMovieModal = () => {
  addMovieModalEl.classList.toggle('visible');
  toggleBackdrop();
};

const cancelAddMovie = () => {
  toggleMovieModal();
};

const backdropClickHandler = () => {
  toggleMovieModal();
};

// ---------- event listeners ----------
startAddMovieButtonEl.addEventListener('click', toggleMovieModal);
backdropEl.addEventListener('click', backdropClickHandler);
cancelAddMovieButtonEl.addEventListener('click', cancelAddMovie);
