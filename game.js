// JavaScript for points
let score = 0;

// Get the button and score display
const basketball = document.getElementById('basketball');
const scoreDisplay = document.getElementById('score');

// Add click event to increase score
basketball.addEventListener('click', () => {
  score++;
  scoreDisplay.textContent = score;
});
