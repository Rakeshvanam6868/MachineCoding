const stars = document.querySelectorAll('.star');
const ratingDisplay = document.getElementById('rating-display');

let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('mouseover', () => {
    resetStars();
    highlightStars(star.dataset.star);
  });

  star.addEventListener('click', () => {
    selectedRating = star.dataset.star;
    ratingDisplay.innerText = `Selected Rating: ${selectedRating}`;
  });

  star.addEventListener('mouseleave', () => {
    resetStars();
    if (selectedRating) {
      highlightStars(selectedRating);
    }
  });
});

function highlightStars(rating) {
  for (let i = 0; i < rating; i++) {
    stars[i].classList.add('hover');
  }
}

function resetStars() {
  stars.forEach(star => star.classList.remove('hover'));
}
