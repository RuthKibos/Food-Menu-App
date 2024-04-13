document.addEventListener('DOMContentLoaded', function () {
  // Function to fetch menu data
  function fetchMenuData() {
    return fetch('http://localhost:3000/menu') // Corrected URL
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  // Function to display food items
  function displayItems(items, containerId) {
    const container = document.getElementById(containerId);

    // Clear container
    container.innerHTML = '';

    // Loop through items and create HTML elements
    items.forEach(item => {
      const foodItem = document.createElement('div');
      foodItem.classList.add('food-item');

      const foodImg = document.createElement('div');
      foodImg.classList.add('food-img');
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name;
      foodImg.appendChild(img);

      const foodContent = document.createElement('div');
      foodContent.classList.add('food-content');

      const foodName = document.createElement('h2');
      foodName.classList.add('food-name');
      foodName.textContent = item.name;

      const price = document.createElement('h3');
      price.classList.add('food-price');
      price.textContent = `$${item.price.toFixed(2)}`;

      const rating = document.createElement('ul');
      rating.classList.add('rating');
      for (let i = 0; i < item.rating; i++) {
        const star = document.createElement('li');
        star.innerHTML = '<i class="fas fa-star"></i>';
        rating.appendChild(star);
      }

      const category = document.createElement('p');
      category.classList.add('category');
      category.innerHTML = `Categories: <span>${item.category}</span>`;

      foodContent.appendChild(foodName);
      foodContent.appendChild(price);
      foodContent.appendChild(rating);
      foodContent.appendChild(category);

      foodItem.appendChild(foodImg);
      foodItem.appendChild(foodContent);

      container.appendChild(foodItem);
    });
  }

  // Fetch menu data and display featured items by default
  fetchMenuData()
    .then(data => {
      if (data && data.menu) { 
        const featuredItems = data.menu.featured;
        const todaySpecials = data.menu.today_specials;
        displayItems(featuredItems, 'food-items');
        const menuBtns = document.querySelectorAll('.menu-btn');
        menuBtns.forEach(btn => {
          btn.addEventListener('click', function () {
            menuBtns.forEach(btn => btn.classList.remove('active-btn'));
            this.classList.add('active-btn');
            const id = this.id;
            if (id === 'featured') {
              displayItems(featuredItems, 'food-items');
            } else if (id === 'today-special') {
              displayItems(todaySpecials, 'food-items');
            }
          });
        });
      } else {
        console.error('Data or menu property not found in response');
      }
    })
    .catch(error => console.error('Error:', error));
});


   