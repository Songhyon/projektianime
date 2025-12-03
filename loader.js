document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader-screen");

  // Keep loader visible briefly so animation plays
  setTimeout(() => {
    loader.classList.add("hidden-loader");

    // Remove loader fully after fade animation ends
    setTimeout(() => {
      loader.style.display = "none";
    }, 600);

  }, 1500); // Loader shows for at least 1.5 second
});