document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const resultsDiv = document.getElementById("results");
    const rankingSelect = document.getElementById("rankingSelect");
    const recentContainer = document.getElementById("recentAnime");

    // ----------------------------
    // Load default top anime (Airing)
    // ----------------------------
    fetchTopAnime("airing");

    // ----------------------------
    // Handle dropdown change
    // ----------------------------
    rankingSelect.addEventListener("change", (e) => {
        fetchTopAnime(e.target.value);
    });

    // ----------------------------
    // Handle search button click jquery-version
    // ----------------------------
    $("#searchBtn").on("click", function () {
        const query = $("#searchInput").val().trim();
        if (query) fetchSearchResults(query);
    });

    // ----------------------------
    // Fetch top anime Axios-version
    // ----------------------------
    function fetchTopAnime(filterType) {
        resultsDiv.innerHTML = `<p>Loading top anime...</p>`;
        axios.get("https://api.jikan.moe/v4/top/anime", {
            params: { filter: filterType, limit: 10 }
        })
        .then(response => {
            if (response.data && response.data.data) {
                displayResults(response.data.data, resultsDiv);
            } else {
                resultsDiv.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch(err => {
            console.error("Axios error:", err);
            resultsDiv.innerHTML = "<p>Failed to load top anime 😢</p>";
        });
            }

    // ----------------------------
    // Search anime by title
    // ----------------------------
    function fetchSearchResults(query) {
        resultsDiv.innerHTML = `<p>Searching for "${query}"...</p>`;
        fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=10`)
            .then(res => res.json())
            .then(data => {
                if (data && data.data.length > 0) displayResults(data.data, resultsDiv);
                else resultsDiv.innerHTML = "<p>No results found.</p>";
            })
            .catch(err => {
                console.error("Error searching anime:", err);
                resultsDiv.innerHTML = "<p>Failed to search anime 😢</p>";
            });
    }

    // ----------------------------
    // Display anime cards
    // ----------------------------
    function displayResults(animeList, container) {
        container.innerHTML = "";
        animeList.forEach(anime => {
            const card = document.createElement("div");
            card.classList.add("anime-card");
            card.dataset.id = anime.mal_id;
            card.innerHTML = `
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}" width="150">
                <h3>${anime.title}</h3>
                <p><strong>Score:</strong> ${anime.score ?? "N/A"}</p>
                <p>Episodes: ${anime.episodes ?? "N/A"}</p>
                <p>${anime.synopsis ? anime.synopsis.slice(0, 120) + "..." : "No description available."}</p>
                <button class="show-more-btn">Show More</button>
            `;
            container.appendChild(card);
        });
    }

    // ----------------------------
    // Event delegation for Show More buttons
    // ----------------------------
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("show-more-btn")) {
            const card = e.target.closest(".anime-card");
            const animeId = card.dataset.id;
            if (animeId) {
                showAnimePreview(animeId); // Call your existing modal function
            }
        }
    });

    // =========================
    // Recent seasonal anime with pagination
    // =========================
    const perPage = 12; // Number of anime per page
    let currentPage = 1;

    // Create pagination buttons dynamically
    const paginationDiv = document.createElement("div");
    paginationDiv.id = "recentPagination";
    paginationDiv.style.display = "flex";
    paginationDiv.style.justifyContent = "center";
    paginationDiv.style.alignItems = "center";
    paginationDiv.style.gap = "10px";
    paginationDiv.style.marginTop = "12px";
    recentContainer.after(paginationDiv);

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Prev";
    prevBtn.disabled = true;

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";

    const pageIndicator = document.createElement("span");
    pageIndicator.textContent = currentPage;

    paginationDiv.append(prevBtn, pageIndicator, nextBtn);

    function fetchRecentAnime(page = 1) {
        recentContainer.innerHTML = `<p>Loading recent anime...</p>`;
        fetch(`https://api.jikan.moe/v4/seasons/2025/fall?page=${page}&limit=${perPage}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.data) {
                    displayResults(data.data, recentContainer);
                    currentPage = page;
                    pageIndicator.textContent = currentPage;
                    prevBtn.disabled = currentPage === 1;
                    nextBtn.disabled = !data.pagination.has_next_page;
                } else {
                    recentContainer.innerHTML = "<p>No recent anime found.</p>";
                }
            })
            .catch(err => {
                console.error('Error fetching recent anime:', err);
                recentContainer.innerHTML = "<p>Failed to load recent anime 😢</p>";
            });
    }

    // Pagination buttons events
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) fetchRecentAnime(currentPage - 1);
    });

    nextBtn.addEventListener("click", () => {
        fetchRecentAnime(currentPage + 1);
    });

    // Initial fetch
    fetchRecentAnime();
});
