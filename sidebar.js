document.addEventListener("DOMContentLoaded", () => {
  const sidebarDiv = document.getElementById("sidebarTopAnime");
  const sidebarSelect = document.getElementById("sidebarSelect");

  // Load default sidebar top anime
  fetchSidebarTopAnime("airing");

  // Listen for dropdown change
  sidebarSelect.addEventListener("change", (e) => {
    const filter = e.target.value;
    fetchSidebarTopAnime(filter);
  });

  // Fetch top anime for sidebar (5 items)
  function fetchSidebarTopAnime(filterType) {
    let url;
    if (filterType === "all") {
      url = `https://api.jikan.moe/v4/top/anime?limit=5`;
    } else {
      url = `https://api.jikan.moe/v4/top/anime?filter=${filterType}&limit=5`;
    }

    sidebarDiv.innerHTML = `<p>Loading top anime...</p>`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          displaySidebar(data.data);
        } else {
          sidebarDiv.innerHTML = "<p>No results found.</p>";
        }
      })
      .catch((err) => {
        console.error("Error fetching sidebar anime:", err);
        sidebarDiv.innerHTML = "<p>Failed to load sidebar anime 😢</p>";
      });
  }

  // Display sidebar cards
  function displaySidebar(animeList) {
    sidebarDiv.innerHTML = "";
    animeList.forEach((anime) => {
      const item = document.createElement("div");
      item.classList.add("sidebar-card");
      item.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
        <div>
          <h4>${anime.title}</h4>
          <p>⭐ ${anime.score ?? "N/A"}</p>
        </div>
      `;
      sidebarDiv.appendChild(item);
    });
  }
});
