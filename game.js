let totalBuckets = 0;
let bucketsPerSecond = 0;
let clicks = 0;
let upgrades = [];
let achievements = [];
let rank = "Beginner";
let nextRankThreshold = 1000;
let upgradeCost = 10;

// HTML Elements
const totalBucketsElem = document.getElementById("totalBuckets");
const bucketsPerSecondElem = document.getElementById("bucketsPerSecond");
const clicksElem = document.getElementById("clicks");
const basketball = document.getElementById("basketball");
const upgradeListElem = document.getElementById("upgrade-list");
const achievementsElem = document.getElementById("achievement-list");
const rankElem = document.getElementById("rank");
const nextRankElem = document.getElementById("nextRank");

// Click event for basketball
basketball.addEventListener("click", () => {
    totalBuckets++;
    clicks++;
    updateStats();
});

// Upgrade System
const upgradesList = [
    { name: "Kevin Durant", cost: 10, effect: () => { bucketsPerSecond += 1; }, description: "Increases CPS by 1." },
    { name: "James Harden", cost: 100, effect: () => { bucketsPerSecond += 5; }, description: "Increases CPS by 5." },
    { name: "LeBron James", cost: 1000, effect: () => { bucketsPerSecond += 10; }, description: "Increases CPS by 10." },
    { name: "Giannis Antetokounmpo", cost: 5000, effect: () => { bucketsPerSecond += 25; }, description: "Increases CPS by 25." },
    { name: "Stephen Curry", cost: 20000, effect: () => { bucketsPerSecond += 50; }, description: "Increases CPS by 50." },
    // Add more upgrades here
];

upgradesList.forEach((upgrade, index) => {
    const button = document.createElement("button");
    button.innerText = `${upgrade.name} (Cost: ${upgrade.cost} buckets)`;
    button.addEventListener("click", () => {
        if (totalBuckets >= upgrade.cost) {
            totalBuckets -= upgrade.cost;
            upgrade.effect();
            upgrades.push(upgrade.name);
            upgradeCost = Math.floor(upgrade.cost * 1.5);
            button.innerText = `${upgrade.name} (Cost: ${upgradeCost} buckets)`;
            updateStats();
            checkAchievements();
        }
    });
    upgradeListElem.appendChild(button);
});

// Achievements
const checkAchievements = () => {
    if (totalBuckets >= 100 && !achievements.includes("100 Buckets!")) {
        achievements.push("100 Buckets!");
        updateAchievements();
    }
    if (totalBuckets >= 1000 && !achievements.includes("1,000 Buckets!")) {
        achievements.push("1,000 Buckets!");
        updateAchievements();
    }
    // Add more achievements here
};

const updateAchievements = () => {
    achievementsElem.innerHTML = "";
    achievements.forEach(ach => {
        const li = document.createElement("li");
        li.innerText = ach;
        achievementsElem.appendChild(li);
    });
};

// Rank System
const checkRank = () => {
    if (totalBuckets >= nextRankThreshold) {
        rank = "All-Star";
        nextRankThreshold = nextRankThreshold * 2;
    }
    rankElem.innerText = `Rank: ${rank}`;
    nextRankElem.innerText = `Next Rank: ${nextRankThreshold} Buckets`;
};

// Update stats
const updateStats = () => {
    totalBucketsElem.innerText = `Buckets: ${totalBuckets}`;
    bucketsPerSecondElem.innerText = `Buckets per second: ${bucketsPerSecond}`;
    clicksElem.innerText = `Clicks: ${clicks}`;
    checkRank();
};

// Auto-generating buckets based on CPS
setInterval(() => {
    totalBuckets += bucketsPerSecond;
    updateStats();
}, 1000);
