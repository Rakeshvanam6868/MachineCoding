import React, { useState, useEffect } from 'react';
import './InfiniteScroll.css';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async (page) => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = Array.from({ length: 10 }, (_, i) => `Item ${page * 10 + i + 1}`);
        resolve(data);
      }, 1000);
    });
  };

  const loadMoreData = async () => {
    const newItems = await fetchData(page);
    setItems((prevItems) => [...prevItems, ...newItems]);
    setIsLoading(false);
    setPage(page + 1);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 5
    ) {
      if (!isLoading) {
        loadMoreData();
      }
    }
  };

  useEffect(() => {
    loadMoreData();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, isLoading]);

  return (
    <div className="infinite-scroll-container">
      <h1>Infinite Scroll Example</h1>
      <div className="items-container">
        {items.map((item, index) => (
          <div key={index} className="item">
            {item}
          </div>
        ))}
      </div>
      {isLoading && <div className="loader">Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;
