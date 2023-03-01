class Film {
    #description;
    #cast = [];
    #length;
    #filmNo;
    #image;
    #genre = [];
    #rating;
    #director;
    #releaseDate;
    #title;

    constructor(description, length, filmNo, image, genre, rating, director, releaseDate, title) {
        this.#description = description;
        this.#length = length;
        this.#filmNo = filmNo;
        this.#image = image;
        this.#genre = genre;
        this.#director = director;
        this.#releaseDate = releaseDate;
        this.#title = title;
        this.#rating = rating;
    }

    getDescription(){
        return this.#description;
    }

    getCast(){
        return this.#cast;
    }

    getLength(){
        return this.#length;
    }

    getFilmNo(){
        return this.#filmNo;
    }

    getImage(){
        return this.#image;
    }

    getGenre(){
        return this.#genre;
    }

    getRating(){
        return this.#rating;
    }

    getDirector(){
        return this.#director;
    }

    getReleaseDate(){
        return this.#releaseDate;
    }

    getTitle(){
        return this.#title;
    }

    setCast(actor){
        this.#cast.push(actor);
    }

    setRating(rating){
        this.#rating = rating;
    }

    setReleaseDate(date){
        this.#releaseDate = date;
    }
}