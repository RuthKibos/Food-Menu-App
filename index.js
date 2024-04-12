document.addEventListener("DOMContentLoaded", function () {
    const menuContainer = document.querySelector(".food-items");
    const menuButtons = document.querySelectorAll(".menu-btn");
    const reviewForm = document.getElementById("review-form");
    const reviewList = document.getElementById("review-list");
  
    let menuData = []; // This will store the fetched menu data
  
    // Fetch data from db.json
    async function fetchMenuData() {
      try {
        const response = await fetch('http://localhost:3000/menu');
        const data = await response.json();
        menuData = data.menu;
        displayMenu(menuData);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }
});

   