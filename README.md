🎬 Anime Explorer

Anime Explorer on verkkosovellus, jonka avulla käyttäjät voivat etsiä, selata ja tutkia animeja. Sovellus näyttää top-anime-listoja, kauden uusimmat animet sivutettuna ja yksityiskohtaiset esikatselut modaalissa.

🌟 Ominaisuudet

Animehaku nimellä ja reaaliaikaisilla tuloksilla.

Top-anime-listat, suodatettavissa Airing, Upcoming tai Popularity.

Kauden uusimmat animet sivutettuna (Seuraava/Edellinen sivu).

Anime-esikatselumodaali yksityiskohtaisille tiedoille.

Sidebar top 5 animeille aikavälin mukaan.

Täysin responsiivinen ja moderni tummateemainen design.

🖥️ Demo


(Korvaa oikealla kuvakaappauksella tai GIFillä)

🛠️ Käytetyt teknologiat

HTML5 – Sivun rakenne.

CSS3 – Tyylit ja responsiivisuus.

JavaScript (Vanilla) – Datan haku, dynaaminen renderöinti ja sivutus.

Jikan API
 – Anime-data MyAnimeListista.

🚀 Käyttöönotto
1. Lataa repositorio
git clone https://github.com/kayttaja/anime-explorer.git
cd anime-explorer

2. Avaa projekti

Avaa index.html selaimessasi.

3. Käytä sovellusta

Käytä hakupalkkia animejen etsimiseen.

Käytä pudotusvalikkoja top-animejen katseluun.

Selaa Recent Anime -osiota ja käytä Next/Prev sivuja.

Klikkaa Show More -painiketta nähdäksesi yksityiskohtaisen esikatselun.

📂 Tiedostorakenne
anime-explorer/
│
├─ index.html          # Pää HTML-tiedosto
├─ styles.css          # Kaikki CSS-tyylit
├─ java.js             # Pää JavaScript hakuun & top animeen
├─ java1.js            # Recent anime ja sivutus
├─ sidebar.js          # Sidebar top anime -suodatin
├─ preview.js          # Modal-esikatselu
└─ README.md           # Projekti-dokumentaatio

🔧 Muokattavuus

Vaihda kausi/vuosi uusimmille animeille java1.js tiedostossa:

fetch(`https://api.jikan.moe/v4/seasons/2025/fall?page=${page}&limit=${perPage}`)


Muuta animejen määrä per sivu muuttujalla perPage.

Muokkaa teeman värejä styles.css tiedostossa :root muuttujien avulla.

⚡ Tulevat parannukset

Lisää numeroidut sivunapit suoraan sivun valitsemiseen.

Lisää suosikkilista paikalliseen tallennukseen.

Mahdollisuus lajitella esim. score, episodes.

Kuvien lazy loading suorituskyvyn parantamiseksi.