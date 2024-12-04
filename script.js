// JavaScript for Basketball Clicker
let score = 0;
let pointsPerClick = 1; // Start with 1 point per click
let upgradeCost = 10; // Upgrade cost starts at 10 points

// Get elements from the DOM
const basketball = document.getElementById('basketball');
const scoreDisplay = document.getElementById('score');
const upgradeButton = document.getElementById('upgrade');
const upgradeCostDisplay = document.getElementById('upgrade-cost');

// Add click event to increase score
basketball.addEventListener('click', () => {
  score += pointsPerClick; // Add points based on pointsPerClick
  scoreDisplay.textContent = score; // Update score display
});

// Add click event to upgrade button
upgradeButton.addEventListener('click', () => {
  if (score >= upgradeCost) {
    score -= upgradeCost; // Subtract upgrade cost from score
    pointsPerClick *= 2; // Double the points per click
    upgradeCost = Math.floor(upgradeCost * 1.5); // Increase the cost of the next upgrade
    upgradeCostDisplay.textContent = upgradeCost; // Update the cost display
    scoreDisplay.textContent = score; // Update score display
  } else {
    alert("Not enough points for an upgrade! Keep clicking! 🏀");
  }
});


