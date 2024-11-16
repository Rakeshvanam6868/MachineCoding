import React, { useState } from "react";
import "./App.css";

const foodItems = [
  { id: 1, name: "Burger", price: 5, category: "Fast Food" },
  { id: 2, name: "Pizza", price: 8, category: "Fast Food" },
  { id: 3, name: "Salad", price: 6, category: "Healthy" },
  { id: 4, name: "Sushi", price: 12, category: "Seafood" },
  { id: 5, name: "Pasta", price: 10, category: "Italian" },
];

const App = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const getFilteredItems = () => {
    let filteredItems = [...foodItems];

    if (search.trim()) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter) {
      filteredItems = filteredItems.filter(
        (item) => item.category === filter
      );
    }

    if (sort === "asc") {
      filteredItems.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      filteredItems.sort((a, b) => b.price - a.price);
    }

    return filteredItems;
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app">
      <h1>Food Ordering App</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="">Filter by Category</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Healthy">Healthy</option>
          <option value="Seafood">Seafood</option>
          <option value="Italian">Italian</option>
        </select>
      </div>

      <div className="food-list">
        {getFilteredItems().map((item) => (
          <div key={item.id} className="food-item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}{" "}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
        <h3>Total: ${total}</h3>
      </div>
    </div>
  );
};

export default App;
