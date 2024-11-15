let currentPage = 1;
const dataContainer = document.getElementById('data-container');
const loader = document.getElementById('loader');

// Fetch data from an API or simulate it
async function fetchData(page) {
  loader.style.display = 'block';
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = Array.from({ length: 10 }, (_, i) => `Item ${page * 10 + i + 1}`);
      resolve(data);
    }, 1000);
  });
}

// Append data to the container
function appendData(items) {
  items.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.textContent = item;
    dataContainer.appendChild(div);
  });
}

// Load more data when near the bottom
async function loadMoreData() {
  const data = await fetchData(currentPage);
  appendData(data);
  loader.style.display = 'none';
  currentPage++;
}

// Infinite scroll logic
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadMoreData();
  }
});

// Initial load
loadMoreData();
