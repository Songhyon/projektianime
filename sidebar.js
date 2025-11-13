document.addEventListener("DOMContentLoaded", () => {
  const sidebarDiv = document.getElementById("sidebarTopAnime");
  const sidebarSelect = document.getElementById("sidebarSelect");

  if (!sidebarDiv) {
    console.error("sidebarTopAnime element not found.");
    return;
  }

  // Default: show 'airing' top 5
  fetchSidebarTopAnime("airing");

  // Change handler for the dropdown
  if (sidebarSelect) {
    sidebarSelect.addEventListener("change", (e) => {
      fetchSidebarTopAnime(e.target.value);
    });
  }

  // Fetch top anime for sidebar (limit 5)
  function fetchSidebarTopAnime(filterType) {
    let url;
    if (filterType === "all") {
      url = `https://api.jikan.moe/v4/top/anime?limit=5`;
    } else {
      // Jikan's top endpoint accepts ?filter=... for sorting categories
      url = `https://api.jikan.moe/v4/top/anime?filter=${encodeURIComponent(filterType)}&limit=5`;
    }

    sidebarDiv.innerHTML = `<p>Loading top anime...</p>`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.data) && data.data.length > 0) {
          displaySidebar(data.data);
        } else {
          sidebarDiv.innerHTML = "<p>No results found.</p>";
        }
      })
      .catch((err) => {
        console.error("Sidebar fetch error:", err);
        sidebarDiv.innerHTML = "<p>Failed to load top anime 😢</p>";
      });
  }

  // Render sidebar items
  function displaySidebar(animeList) {
    sidebarDiv.innerHTML = "";
    animeList.forEach((anime) => {
      // Each item includes data-id so preview.js can open details
      const item = document.createElement("div");
      item.className = "sidebar-card";
      item.dataset.id = anime.mal_id; // critical for preview
      item.innerHTML = `
        <img src="${anime.images?.jpg?.image_url || ''}" alt="${escapeHtml(anime.title)}" />
        <div>
          <h4 title="${escapeHtml(anime.title)}">${truncate(anime.title, 28)}</h4>
          <p>⭐ ${anime.score ?? "N/A"}</p>
        </div>
      `;
      sidebarDiv.appendChild(item);
    });
  }

  // small helper: truncate long titles
  function truncate(str = "", n = 30) {
    return str.length > n ? str.slice(0, n - 1) + "…" : str;
  }

  // escape for attribute safety
  function escapeHtml(s = "") {
    return s.replace(/[&<>"']/g, (m) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[m]));
  }
});
