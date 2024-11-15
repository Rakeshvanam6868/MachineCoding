import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    loadImages();
  }, [currentPage, query]);

  const loadImages = async () => {
    if (isFetching) return;

    setIsFetching(true);
    const url = `https://api.unsplash.com/search/photos?page=${currentPage}&query=${query}&client_id=YOUR_ACCESS_KEY`;
    const response = await fetch(url);
    const data = await response.json();
    setImages((prevImages) => (currentPage === 1 ? data.results : [...prevImages, ...data.results]));
    setIsFetching(false);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="app">
      <h1>Image Gallery</h1>
      <input
        type="text"
        placeholder="Search images..."
        value={query}
        onChange={handleSearch}
      />
      <div className="gallery">
        {images.map((image) => (
          <div key={image.id} className="image-container">
            <img src={image.urls.small} alt={image.alt_description} />
          </div>
        ))}
      </div>
      <button onClick={loadMore} className="load-more">
        Load More
      </button>
    </div>
  );
};

export default App;
