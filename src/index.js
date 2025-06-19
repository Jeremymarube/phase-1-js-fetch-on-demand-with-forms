document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const input = document.getElementById("searchByID");
  const movieDetails = document.getElementById("movieDetails");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Stop the form from reloading the page

    const movieID = input.value;

    fetch(`http://localhost:3000/movies/${movieID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Movie not found");
        }
        return response.json();
      })
      .then((movie) => {
        // Update the page with the movie data
        movieDetails.innerHTML = `
          <h4>${movie.title}</h4>
          <p>${movie.summary}</p>
        `;
      })
      .catch((error) => {
        movieDetails.innerHTML = `<p style="color: red;">${error.message}</p>`;
      });
  });
});

const init = () => {
  const inputForm = document.querySelector("form");

  inputForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    const input = document.querySelector("input#searchByID"); // Get the input field
    const movieID = input.value; // Get the value entered

    fetch(`http://localhost:3000/movies/${movieID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Movie not found");
        }
        return response.json();
      })
      .then((data) => {
        const title = document.querySelector("section#movieDetails h4");
        const summary = document.querySelector("section#movieDetails p");

        title.innerText = data.title;
        summary.innerText = data.summary;
      })
      .catch((error) => {
        const title = document.querySelector("section#movieDetails h4");
        const summary = document.querySelector("section#movieDetails p");

        title.innerText = "Error";
        summary.innerText = error.message;
        console.error("Fetch error:", error);
      });
  });
};

document.addEventListener("DOMContentLoaded", init);


