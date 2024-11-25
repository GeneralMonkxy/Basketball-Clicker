let bucketCount = 0; // Total buckets scored
let bps = 0; // Buckets per second
let totalPlayers = 0; // Track the number of players hired
let clickingBoostActive = false;

const shootButton = document.getElementById("basketball");  // Basketball image
const bucketCountDisplay = document.getElementById("bucketCount");
const bpsDisplay = document.getElementById("bps");
const upgradeButtonsContainer = document.getElementById("upgradeButtons");

// Click to score a bucket by clicking the basketball
shootButton.addEventListener("click", () => {
  bucketCount += (clickingBoostActive ? 2 : 1); // If boost is active, add 2 buckets per click
  updateUI();
});

// Function to add a player to the game
function addPlayer() {
  totalPlayers++;
  let cost, bpsIncrease;

  // Determine cost and BPS based on player number
  if (totalPlayers <= 100) {
    cost = 100 * totalPlayers;
    bpsIncrease = totalPlayers * 0.1; // Early game players
  } else if (totalPlayers <= 500) {
    cost = 500 + 50 * (totalPlayers - 100);
    bpsIncrease = 2 + Math.floor((totalPlayers - 100) / 10); // Mid game players
  } else if (totalPlayers <= 1000) {
    cost = 1000 + 100 * (totalPlayers - 500);
    bpsIncrease = 6 + Math.floor((totalPlayers - 500) / 20); // Late game players
  } else {
    cost = 5000 + 500 * (totalPlayers - 1000);
    bpsIncrease = 25 + Math.floor((totalPlayers - 1000) / 50); // Legendary players
  }

  // Create the button for this player
  const playerButton = document.createElement("button");
  playerButton.textContent = `Hire Player ${totalPlayers} (Cost: ${cost} buckets)`;
  playerButton.addEventListener("click", () => {
    if (bucketCount >= cost) {
      bucketCount -= cost;
      bps += bpsIncrease; // Add BPS from hired player
      playerButton.disabled = true; // Disable button after hiring
      updateUI();
    }
  });

  upgradeButtonsContainer.appendChild(playerButton);
}

// Function to update UI with current bucket count and BPS
function updateUI() {
  bucketCountDisplay.textContent = bucketCount;
  bpsDisplay.textContent = bps;
}

// Automatically generate players up to a certain point for testing
for (let i = 1; i <= 10; i++) {
  addPlayer();
}

// Automatically add buckets based on BPS
setInterval(() => {
  bucketCount += bps;
  updateUI();
}, 1000);

