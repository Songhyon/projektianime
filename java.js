document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const resultsDiv = document.getElementById("results");
  const rankingSelect = document.getElementById("rankingSelect");

  // Load default top anime (Daily / Airing)
  fetchTopAnime("airing");

  // Handle dropdown change
  rankingSelect.addEventListener("change", (e) => {
    const filter = e.target.value;
    fetchTopAnime(filter);
  });

  // Handle search button click
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      fetchSearchResults(query);
      
    }
  });

  // Fetch top anime (Daily, Weekly, Monthly)
  function fetchTopAnime(filterType) {
    const url = `https://api.jikan.moe/v4/top/anime?filter=${filterType}&limit=10`;

    resultsDiv.innerHTML = `<p>Loading top anime...</p>`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          displayResults(data.data);
        } else {
          resultsDiv.innerHTML = "<p>No results found.</p>";
        }
      })
      .catch((err) => {
        console.error("Error fetching top anime:", err);
        resultsDiv.innerHTML = "<p>Failed to load top anime 😢</p>";
      });
  }

  // Search anime by title
  function fetchSearchResults(query) {
    const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=10`;

    resultsDiv.innerHTML = `<p>Searching for "${query}"...</p>`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data.length > 0) {
          displayResults(data.data);
        } else {
          resultsDiv.innerHTML = "<p>No results found.</p>";
        }
      })
      .catch((err) => {
        console.error("Error searching anime:", err);
        resultsDiv.innerHTML = "<p>Failed to search anime 😢</p>";
      });
  }

  // Display anime cards
  function displayResults(animeList) {
    resultsDiv.innerHTML = "";
    animeList.forEach((anime) => {
      const card = document.createElement("div");
      card.classList.add("anime-card");
      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
        <h3>${anime.title}</h3>
        <p><strong>Score:</strong> ${anime.score ?? "N/A"}</p>
        <p>${anime.synopsis ? anime.synopsis.slice(0, 120) + "..." : "No description available."}</p>
      `;
      resultsDiv.appendChild(card);
    });
  }
});


