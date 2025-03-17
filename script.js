document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
    const githubLogo = document.getElementById("github-logo");

    // Detect system theme and apply it initially
    const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("darkMode");

    function updateGithubLogo() {
        if (body.classList.contains("dark-mode")) {
            githubLogo.src = "./assets/github-mark-black.svg";
        } else {
            githubLogo.src = "./assets/github-mark-white.svg";
        }
    }

    if (savedTheme === "enabled" || (!savedTheme && systemDarkMode)) {
        body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️";
    }

    // Dark mode toggle
    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.textContent = "☀️";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.textContent = "🌙";
        }
        updateGithubLogo();
    });

    // Fetch and display scores
    fetch('scores.json')
        .then(response => response.json())
        .then(data => {
            let scoreboard = document.getElementById('scoreboard');
            scoreboard.innerHTML = '';

            // Sort scores in descending order
            data.friends.sort((a, b) => b.score - a.score);

            // Assign ranking emojis dynamically
            data.friends.forEach((friend, index) => {
                let emoji = index === 0 ? "🏆" : index === 1 ? "🥈" : "🔥";
                let card = `<div class="card">${emoji} ${friend.name}: ${friend.score}</div>`;
                scoreboard.innerHTML += card;
            });
        })
        .catch(error => console.error('Error loading scores:', error));
});