async function loadNewYearPage() {
  try {
    const response = await fetch("new-year-new-you.json");

    if (!response.ok) {
      throw new Error("Could not load new-year-new-you.json");
    }

    const data = await response.json();
    const film = data.film;

    document.title = film.seo.pageTitle;

    const metaDescription = document.getElementById("meta-description");
    metaDescription.setAttribute("content", film.seo.metaDescription);

    document.getElementById("film-type").textContent = `${film.type} / ${film.genre}`;
    document.getElementById("film-title").textContent = film.title;
    document.getElementById("film-tagline").textContent = film.tagline;
    document.getElementById("film-logline").textContent = film.logline;
    document.getElementById("film-synopsis").textContent = film.synopsis;
    document.getElementById("director-statement").textContent = film.directorStatement;

    const poster = document.getElementById("film-poster");
    poster.src = film.poster.image;
    poster.alt = film.poster.alt;

    const watchLink = document.getElementById("watch-link");
    watchLink.href = film.links.watchFilm;

    const trailerLink = document.getElementById("trailer-link");
    trailerLink.href = film.links.trailer;

    renderDetails(film.details);
    renderThemes(film.themes);
    renderCredits(film.credits);
    renderStills(film.stills);

  } catch (error) {
    console.error(error);

    document.getElementById("film-logline").textContent =
      "Film details could not be loaded. Please check that new-year-new-you.json is in the same folder as new-year-new-you.html.";
  }
}

function renderDetails(details) {
  const detailsList = document.getElementById("film-details-list");

  detailsList.innerHTML = `
    <li><span>Runtime:</span> ${details.runtime}</li>
    <li><span>Release Year:</span> ${details.releaseYear}</li>
    <li><span>Country:</span> ${details.country}</li>
    <li><span>Language:</span> ${details.language}</li>
    <li><span>Format:</span> ${details.format}</li>
  `;
}

function renderThemes(themes) {
  const themesList = document.getElementById("film-themes-list");

  themesList.innerHTML = themes
    .map(theme => `<li>${theme}</li>`)
    .join("");
}

function renderCredits(credits) {
  const creditsList = document.getElementById("film-credits-list");

  creditsList.innerHTML = `
    <li><span>Director:</span> ${credits.director}</li>
    <li><span>Writer:</span> ${credits.writer}</li>
    <li><span>Producer:</span> ${credits.producer}</li>
    <li><span>Cast:</span> ${credits.cast.join(", ")}</li>
    <li><span>Cinematographer:</span> ${credits.cinematographer}</li>
    <li><span>Editor:</span> ${credits.editor}</li>
    <li><span>Composer:</span> ${credits.composer}</li>
  `;
}

function renderStills(stills) {
  const stillsGrid = document.getElementById("stills-grid");

  stillsGrid.innerHTML = stills
    .map(still => {
      return `
        <figure class="still-card">
          <img src="${still.image}" alt="${still.alt}" />
        </figure>
      `;
    })
    .join("");
}

loadNewYearPage();