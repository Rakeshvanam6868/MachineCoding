const foodItems = [
    { id: 1, name: "Burger", price: 5, category: "Fast Food" },
    { id: 2, name: "Pizza", price: 8, category: "Fast Food" },
    { id: 3, name: "Salad", price: 6, category: "Healthy" },
    { id: 4, name: "Sushi", price: 12, category: "Seafood" },
    { id: 5, name: "Pasta", price: 10, category: "Italian" },
  ];
  
  let cart = [];
  
  function renderFoodItems(items) {
    const foodList = document.getElementById("foodList");
    foodList.innerHTML = "";
  
    items.forEach((item) => {
      const foodDiv = document.createElement("div");
      foodDiv.className = "food-item";
      foodDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <p>Category: ${item.category}</p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
      `;
      foodList.appendChild(foodDiv);
    });
  }
  
  function renderCart() {
    const cartList = document.getElementById("cartList");
    const totalPrice = document.getElementById("totalPrice");
  
    cartList.innerHTML = "";
    let total = 0;
  
    cart.forEach((item) => {
      total += item.price;
      const cartItem = document.createElement("li");
      cartItem.innerHTML = `
        ${item.name} - $${item.price} 
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartList.appendChild(cartItem);
    });
  
    totalPrice.innerText = total;
  }
  
  function addToCart(itemId) {
    const item = foodItems.find((food) => food.id === itemId);
    cart.push(item);
    renderCart();
  }
  
  function removeFromCart(itemId) {
    cart = cart.filter((item) => item.id !== itemId);
    renderCart();
  }
  
  function filterAndRender() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const sortSelect = document.getElementById("sortSelect").value;
    const filterSelect = document.getElementById("filterSelect").value;
  
    let filteredItems = [...foodItems];
  
    if (searchInput) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(searchInput)
      );
    }
  
    if (filterSelect) {
      filteredItems = filteredItems.filter((item) => item.category === filterSelect);
    }
  
    if (sortSelect === "asc") {
      filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortSelect === "desc") {
      filteredItems.sort((a, b) => b.price - a.price);
    }
  
    renderFoodItems(filteredItems);
  }
  
  document.getElementById("searchInput").addEventListener("input", filterAndRender);
  document.getElementById("sortSelect").addEventListener("change", filterAndRender);
  document.getElementById("filterSelect").addEventListener("change", filterAndRender);
  
  // Initial render
  renderFoodItems(foodItems);
  renderCart();
  