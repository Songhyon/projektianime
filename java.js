document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const resultsDiv = document.getElementById("results");
  const rankingSelect = document.getElementById("rankingSelect");

  // Load default top anime (Daily / Airing)
  fetchTopAnime("airing");

  // Handle dropdown change
  rankingSelect.addEventListener("change", (e) => {
    fetchTopAnime(e.target.value);
  });

  // Handle search button click
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) fetchSearchResults(query);
  });

  // Fetch top anime (Daily, Weekly, Monthly)
  function fetchTopAnime(filterType) {
    resultsDiv.innerHTML = `<p>Loading top anime...</p>`;

    fetch(`https://api.jikan.moe/v4/top/anime?filter=${filterType}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) displayResults(data.data);
        else resultsDiv.innerHTML = "<p>No results found.</p>";
      })
      .catch((err) => {
        console.error("Error fetching top anime:", err);
        resultsDiv.innerHTML = "<p>Failed to load top anime 😢</p>";
      });
  }

  // Search anime by title
  function fetchSearchResults(query) {
    resultsDiv.innerHTML = `<p>Searching for "${query}"...</p>`;

    fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data.length > 0) displayResults(data.data);
        else resultsDiv.innerHTML = "<p>No results found.</p>";
      })
      .catch((err) => {
        console.error("Error searching anime:", err);
        resultsDiv.innerHTML = "<p>Failed to search anime 😢</p>";
      });
  }

  // Display anime cards with Show More button
  function displayResults(animeList) {
    resultsDiv.innerHTML = "";
    animeList.forEach((anime) => {
      const card = document.createElement("div");
      card.classList.add("anime-card");
      card.dataset.id = anime.mal_id; // store MAL ID for modal
      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
        <h3>${anime.title}</h3>
        <p><strong>Score:</strong> ${anime.score ?? "N/A"}</p>
        <p>${anime.synopsis ? anime.synopsis.slice(0, 120) + "..." : "No description available."}</p>
        <button class="show-more-btn">Show More</button>
      `;
      resultsDiv.appendChild(card);
    });
  }

  // Event delegation for Show More buttons
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("show-more-btn")) {
      const card = e.target.closest(".anime-card");
      const animeId = card.dataset.id;
      if (animeId) {
        showAnimePreview(animeId); // call your existing modal function
      }
    }
  });
});


