const gallery = document.getElementById("gallery");
const loadMoreButton = document.getElementById("load-more");
const searchBar = document.getElementById("search-bar");

let currentPage = 1;
let isFetching = false;

async function fetchImages(page, query = "") {
  isFetching = true;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=YOUR_ACCESS_KEY`;
  const response = await fetch(url);
  const data = await response.json();
  isFetching = false;
  return data.results;
}

async function loadImages() {
  if (isFetching) return;
  
  const query = searchBar.value;
  const images = await fetchImages(currentPage, query);

  images.forEach((image) => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    imageContainer.innerHTML = `<img src="${image.urls.small}" alt="${image.alt_description}">`;
    gallery.appendChild(imageContainer);
  });

  currentPage++;
}

function clearGallery() {
  gallery.innerHTML = "";
  currentPage = 1;
}

searchBar.addEventListener("input", () => {
  clearGallery();
  loadImages();
});

loadMoreButton.addEventListener("click", loadImages);

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isFetching) {
    loadImages();
  }
});

loadImages();
