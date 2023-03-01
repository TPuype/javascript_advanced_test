class Library {
    #films = [];

    constructor(){
    }

    getFilms(){
        return this.#films;
    }

    addFilm(film){
        this.#films.push(film);
    }

}