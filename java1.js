// Wait until page is loaded
document.addEventListener('DOMContentLoaded', () => {

    const recentContainer = document.getElementById('recentAnime');

//fetch recent anime data from Jikan API
    fetch('https://api.jikan.moe/v4/seasons/2025/fall')
        .then(response => response.json())
        .then(data => {
            console.log(data);
//take the 10 first anime and display their titles
            data.data.slice(0, 10).forEach(anime => {
                const animeDiv = document.createElement('div');
                animeDiv.classList.add('anime-card');
                animeDiv.innerHTML = `
                    <h3>${anime.title}</h3>
                    <img src="${anime.images.jpg.image_url}" alt="${anime.title} poster" width="150">
                    <p>Episodes: ${anime.episodes || 'N/A'}</p>
                    <p>Score: ${anime.score || 'N/A'}</p>
                    <p>${anime.synopsis ? anime.synopsis.slice(0, 120) + "..." : "No description available."}</p>
                `;


                recentContainer.appendChild(animeDiv);
            });
        })
        .catch(error => console.error('Error fetching recent anime:', error));
});

//testi