document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const resultsDiv = document.getElementById("results");
    const rankingSelect = document.getElementById("rankingSelect");
    const recentContainer = document.getElementById("recentAnime");

    // -------------------------------------
    // Load default top anime (Airing)
    // -------------------------------------
    fetchTopAnime("airing");

    // -------------------------------------
    // Dropdown change for ranking filter
    // -------------------------------------
    rankingSelect.addEventListener("change", (e) => {
        fetchTopAnime(e.target.value);
    });

    // -------------------------------------
    // Search button (jQuery)
    // -------------------------------------
    $("#searchBtn").on("click", function () {
        const query = $("#searchInput").val().trim();
        if (query) fetchSearchResults(query);
    });

    // -------------------------------------
    // Clear Results button jQuery
    // -------------------------------------
    $("<button id='clearBtn' class='mt-2 px-3 py-1 bg-pink-600 rounded'>Clear Results</button>")
        .insertAfter("#searchBtn")
        .hide()
        .fadeIn(300);

    $("#clearBtn").on("click", () => {
        $(resultsDiv).fadeOut(200, () => {
            resultsDiv.innerHTML = "<p>Results cleared.</p>";
            $(resultsDiv).fadeIn(200);
        });
    });

    // -------------------------------------
    // Fetch TOP Anime (AXIOS)
    // -------------------------------------
    function fetchTopAnime(filterType) {
        resultsDiv.innerHTML = `<p>Loading top anime...</p>`;
        axios.get("https://api.jikan.moe/v4/top/anime", {
            params: { filter: filterType, limit: 10 }
        })
        .then(response => {
            if (response.data?.data) displayResults(response.data.data, resultsDiv);
            else resultsDiv.innerHTML = "<p>No results found.</p>";
        })
        .catch(err => {
            console.error("Axios error:", err);
            resultsDiv.innerHTML = "<p>Failed to load top anime 😢</p>";
        });
    }

    // -------------------------------------
    // SEARCH Anime (FETCH) 
    // -------------------------------------
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

    // -------------------------------------
    // Display anime cards (jQuery upgraded)
    // -------------------------------------
    function displayResults(animeList, container) {
        container.innerHTML = "";

        animeList.forEach(anime => {
            const card = $(`
                <div class="anime-card" data-id="${anime.mal_id}" style="display:none;">
                    <img src="${anime.images.jpg.image_url}" alt="${anime.title}" width="150">
                    <h3>${anime.title}</h3>
                    <p><strong>Score:</strong> ${anime.score ?? "N/A"}</p>
                    <p>Episodes: ${anime.episodes ?? "N/A"}</p>
                    <p>${anime.synopsis ? anime.synopsis.slice(0, 120) + "..." : "No description available."}</p>
                    <button class="show-more-btn">Show More</button>
                </div>
            `);

            $(container).append(card);

            // Smooth animation
            card.fadeIn(250);

            // Hover effect
            card.hover(
                function () { $(this).css("transform", "scale(1.05)"); },
                function () { $(this).css("transform", "scale(1)"); }
            );
        });
    }

    // -------------------------------------
    // Event delegation for Show More
    // -------------------------------------
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("show-more-btn")) {
            const card = e.target.closest(".anime-card");
            const animeId = card.dataset.id;
            if (animeId) showAnimePreview(animeId);
        }
    });

    // -------------------------------
    // RECENT ANIME
    // -------------------------------
    const perPage = 12;
    let currentPage = 1;

    const paginationDiv = document.createElement("div");
    paginationDiv.id = "recentPagination";
    paginationDiv.style.display = "flex";
    paginationDiv.style.justifyContent = "center";
    paginationDiv.style.gap = "10px";
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

        axios.get("https://api.jikan.moe/v4/seasons/2025/fall", {
            params: { page: page, limit: perPage }
        })
        .then(res => {
            const data = res.data;
            if (data?.data) {
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
            console.error("Axios recent error:", err);
            recentContainer.innerHTML = "<p>Failed to load recent anime 😢</p>";
        });
    }

    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) fetchRecentAnime(currentPage - 1);
    });

    nextBtn.addEventListener("click", () => {
        fetchRecentAnime(currentPage + 1);
    });

    fetchRecentAnime();
});
