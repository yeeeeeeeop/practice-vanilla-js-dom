// ---------- elements ----------
// buttons
const startAddMovieButtonEl = document.querySelector('header button');

// modals
const addMovieModalEl = document.getElementById('add-modal');

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

startAddMovieButtonEl.addEventListener('click', toggleMovieModal);
