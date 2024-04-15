document.addEventListener("DOMContentLoaded", function() {
  const featuredBtn = document.getElementById("featured");
  const todaySpecialBtn = document.getElementById("today-special");
  const newArrivalBtn = document.getElementById("new-arrival");
  const reviewForm = document.getElementById("review-form");

  // Fetch food data from db.json
  async function fetchFoodData() {
    try {
      const response = await fetch("db.json");
      const data = await response.json();
      return data.food;
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  }

  // Display food items based on category
  function displayFoodItems(category) {
    const foodItems = document.querySelectorAll(".food-item");
    foodItems.forEach(item => {
      if (item.classList.contains(category)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  // Event listener for featured button
  featuredBtn.addEventListener("click", function() {
    displayFoodItems("featured");
  });

  // Event listener for today's special button
  todaySpecialBtn.addEventListener("click", function() {
    displayFoodItems("today-special");
  });

  // Event listener for new arrival button
  newArrivalBtn.addEventListener("click", function() {
    displayFoodItems("new-arrival");
  });

  // Event listener for rating stars
  const ratingStars = document.querySelectorAll(".rating i");
  ratingStars.forEach(star => {
    star.addEventListener("click", function() {
      alert("Thank you for rating!");
    });
  });

  // Event listener for review submission
  reviewForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const reviewInput = document.getElementById("review");
    const review = reviewInput.value.trim();

    if (review !== "") {
      console.log("Review submitted:", review);
      reviewInput.value = "";
    } else {
      alert("Please enter a review.");
    }
  });

  // Initially display featured items
  displayFoodItems("featured");
});