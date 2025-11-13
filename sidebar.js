document.addEventListener("DOMContentLoaded", () => {
  const sidebarDiv = document.getElementById("sidebarTopAnime");

  // Fetch top 5 anime for sidebar
  fetch("https://api.jikan.moe/v4/top/anime?limit=5")
    .then((res) => res.json())
    .then((data) => {
      if (data && data.data) {
        displaySidebar(data.data);
      } else {
        sidebarDiv.innerHTML = "<p>No top anime found.</p>";
      }
    })
    .catch((err) => {
      console.error("Sidebar fetch error:", err);
      sidebarDiv.innerHTML = "<p>Failed to load top anime 😢</p>";
    });

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
