// Wait until page is loaded
document.addEventListener('DOMContentLoaded', () => {

    const recentContainer = document.getElementById('recentAnime');

//fecth recent anime data from Jikan API
    fetch('https://api.jikan.moe/v4/seasons/2025/fall')
        .then(response => response.json())
        .then(data => {
            console.log(data);
//take the 10 first anime and display their titles
            data.data.slice(0, 10).forEach(anime => {
                const animeDiv = document.createElement('div');
                animeDiv.textContent = anime.title;
                recentContainer.appendChild(animeDiv);
            });
        })
        .catch(error => console.error('Error fetching recent anime:', error));
});