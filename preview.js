document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("previewModal");
  const modalBody = document.getElementById("modalBody");
  const closeBtn = modal ? modal.querySelector(".close") : null;

  if (!modal || !modalBody) {
    console.error("Preview modal elements (#previewModal or #modalBody) not found.");
    return;
  }

  // Close handlers
  if (closeBtn) {
    closeBtn.addEventListener("click", () => hideModal());
  }
  window.addEventListener("click", (e) => { if (e.target === modal) hideModal(); });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") hideModal(); });

  // Delegated click listener for anime cards (both main and sidebar)
  document.body.addEventListener("click", (e) => {
    const card = e.target.closest(".anime-card, .sidebar-card");
    if (!card) return;

    const animeId = resolveAnimeIdFromCard(card);
    if (!animeId) {
      console.warn("Clicked card has no data-id; preview can't open.");
      return;
    }
    showAnimePreview(animeId);
  });

  function resolveAnimeIdFromCard(card) {
    if (card.dataset && card.dataset.id) return card.dataset.id;
    if (card.getAttribute && card.getAttribute("data-id")) return card.getAttribute("data-id");
    const childWithId = card.querySelector("[data-id]");
    if (childWithId && childWithId.dataset && childWithId.dataset.id) return childWithId.dataset.id;
    const img = card.querySelector("img");
    if (img && img.getAttribute("data-mal-id")) return img.getAttribute("data-mal-id");
    return null;
  }

  function showAnimePreview(animeId) {
    modal.style.display = "flex";
    modalBody.innerHTML = `<p>Loading anime details...</p>`;

    const url = `https://api.jikan.moe/v4/anime/${encodeURIComponent(animeId)}/full`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((payload) => {
        if (!payload || !payload.data) {
          modalBody.innerHTML = "<p>Anime details not found.</p>";
          return;
        }
        renderAnimeModal(payload.data);
      })
      .catch((err) => {
        console.error("Error loading anime details:", err);
        modalBody.innerHTML = "<p>Failed to load anime details 😢</p>";
      });
  }

  function renderAnimeModal(anime) {
    const genres = (anime.genres || []).map((g) => g.name).join(", ") || "N/A";
    const studios = (anime.studios || []).map((s) => s.name).join(", ") || "N/A";
    const trailerUrl = anime.trailer?.url || null;
    const trailerEmbed = trailerUrl && trailerUrl.includes("youtube.com")
      ? createYouTubeEmbed(trailerUrl)
      : "";

    modalBody.innerHTML = `
      <div class="modal-preview">
        <h2>${escapeHtml(anime.title)}</h2>
        <img class="modal-img" src="${anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || ""}" alt="${escapeHtml(anime.title)}" />
        <div class="meta-row">
          <p><strong>Score:</strong> ${anime.score ?? "N/A"}</p>
          <p><strong>Episodes:</strong> ${anime.episodes ?? "N/A"}</p>
          <p><strong>Status:</strong> ${anime.status ?? "N/A"}</p>
        </div>
        <p><strong>Studios:</strong> ${escapeHtml(studios)}</p>
        <p><strong>Genres:</strong> ${escapeHtml(genres)}</p>
        <p class="synopsis">${escapeHtml(anime.synopsis ?? "No description available.")}</p>
        ${trailerEmbed}
      </div>
    `;
  }

  function hideModal() {
    modal.style.display = "none";
    modalBody.innerHTML = "";
  }

  function escapeHtml(s = "") {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
});
