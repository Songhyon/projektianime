🎬 Anime Explorer

Anime Explorer is a web application that allows users to search, browse, and explore anime. It provides top anime lists, recent seasonal anime with pagination, and detailed previews via a modal.

🌟 Features

Search anime by title with real-time results.

Top anime lists filtered by Airing, Upcoming, or Popularity.

Recent seasonal anime with pagination (Next/Prev pages).

Anime preview modal showing detailed information.

Sidebar with top 5 anime filtered by timeframe.

Fully responsive design with a clean dark theme.

🖥️ Demo


(Replace with actual screenshot or GIF if available)

🛠️ Technologies Used

HTML5 – Structure of the webpage.

CSS3 – Clean, modern, and responsive styling.

JavaScript (Vanilla) – Fetching data, dynamic rendering, and pagination.

Jikan API
 – Anime data from MyAnimeList.

🚀 Getting Started
1. Clone the repository
git clone https://github.com/yourusername/anime-explorer.git
cd anime-explorer

2. Open the project

Open index.html in your favorite browser.

3. Explore

Use the search bar to find anime by title.

Use the dropdowns to see top anime.

Scroll through Recent Anime and click Next/Prev to navigate pages.

Click Show More on any anime card to open a preview modal.

📂 File Structure
anime-explorer/
│
├─ index.html          # Main HTML file
├─ styles.css          # All CSS styling
├─ java.js             # Main JavaScript for search & top anime
├─ java1.js            # JavaScript for recent anime pagination
├─ sidebar.js          # Sidebar top anime filter
├─ preview.js          # Modal preview logic
└─ README.md           # Project documentation

🔧 Customization

Change season/year for recent anime in java1.js:

fetch(`https://api.jikan.moe/v4/seasons/2025/fall?page=${page}&limit=${perPage}`)


Adjust number of anime per page with perPage variable.

Modify theme colors in styles.css under :root variables.

⚡ Future Improvements

Add numbered pagination buttons for direct page jumps.

Add favorites list with local storage.

Include sorting options (score, episodes, etc.).

Implement lazy loading images for better performance.

📄 License

This project is open-source and free to use.