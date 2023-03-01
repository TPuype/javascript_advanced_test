"use strict";


let library = new Library();

// index van de navigatie 
let index = 0;

// asynchrone functie die de JSON laadt en de lijst van films oplevert
async function getfilmsJSON() {
    const response = await fetch('Data/movies_nows.json')

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const filmList = await response.json();
    return filmList;
}

// Vanaf dat de JSON geladen is voer dan de volgende functies uit
getfilmsJSON().then(filmList => {
    fillLibrary(filmList);
    indexCheck();
    show(index);
});

// functie om door de JSON file te itereren en de JSON object om te zetten in Film objecten
function fillLibrary(data) {
    for (let i = 0; i < data.length; i++) {

        //Maakt de datum leesbaar
        let release = JSON.stringify(data[i].release);
        let releaseDate = release.slice(10, 20);

        let film = new Film(
            data[i].beschrijving,
            data[i].duur,
            data[i].filmNr,
            data[i].foto,
            data[i].genres,
            data[i].rating,
            data[i].regisseur,
            releaseDate,
            data[i].titel
        );

        // Controles op mogelijke lege of ongedefinieerde parameters
        if (!film.getRating()) {
            film.setRating("N/A");
        }

        if (!film.getReleaseDate()) {
            film.setReleaseDate("N/A");
        }

        if (data[i].cast) {
            for (let j = 0; j < data[i].cast.length; j++) {
                film.setCast(data[i].cast[j].acteur);
            }
        } else {
            film.setCast("N/A");
        }

        // Voeg het nieuwe Film object toe aan het film collectie object
        library.addFilm(film);
    }
}

//functie die data visualiseerd
function show(index) {
    let list = library.getFilms();
    document.getElementById("title").innerHTML = list[index].getTitle() + "  " + "<small>(" + list[index].getFilmNo() + ")</small>";
    document.getElementById("cover").src = "img/" + list[index].getImage();
    document.getElementById("description").innerHTML = list[index].getDescription();
    document.getElementById("length").innerHTML = list[index].getLength();
    document.getElementById("director").innerHTML = list[index].getDirector();
    document.getElementById("releaseDate").innerHTML = list[index].getReleaseDate();
    document.getElementById("rating").innerHTML = list[index].getRating();

    let cast = list[index].getCast();
    let castList = document.createElement("ul");
    document.getElementById("cast").appendChild(castList);
    for (let i = 0; i < cast.length; i++) {
        let actor = document.createElement("li");
        castList.appendChild(actor);
        actor.innerHTML = cast[i];
    }

    let genreList = document.getElementById("genres");
    let genres = list[index].getGenre();
    let genre = genres[0] + ",  ";
    for (let j = 1; j < genres.length; j++) {
        genre += genres[j] + ",  ";
    }
    genre = genre.substring(0, genre.length - 3);
    genreList.innerHTML = genre;
}

// Controllers voor de navigatie
document.getElementById("previous").addEventListener("click", () => {
    index--
    clearCastList();
    show(index);
    indexCheck();
})

document.getElementById("next").addEventListener("click", () => {
    index++
    clearCastList();
    show(index);
    indexCheck();
})

//functie die controleerd of de gebruiker de eerste of de latste film bekijkt.
function indexCheck() {
    if (index === 0) {
        document.getElementById("previous").disabled = true;
    } else if (index == library.getFilms().length - 1) {
        document.getElementById("next").disabled = true;
    } else {
        document.getElementById("previous").disabled = false;
        document.getElementById("next").disabled = false;
    }
}


//functie die ul van de cast leegt
function clearCastList() {
    document.getElementById("cast").innerHTML = "";
}


