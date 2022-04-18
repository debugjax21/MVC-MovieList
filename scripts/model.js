let movieList = [];

let nextMovieId = 1000;

function Movie(name, mRated, year, pRating, genre, isChecked) {
    this.id = nextMovieId++;
    this.name = name;
    this.mRated = mRated; 
    this.year = year;
    this.pRating = pRating;
    this.genre = genre;
    this.isChecked = isChecked;
}

function modelCreateMovie(name, mRated, year, pRating, genre, isChecked) {
    let newMovie = new Movie(name, mRated, year, pRating, genre, isChecked);

    // Add the new movie to the model.
    movieList.push(newMovie);
    
    return newMovie;
}

function modelGetMovies() {
    return movieList;
}

function modelGetMovie(id) {
    for (x in movieList) {
        if (movieList[x].id === id) {
            return movieList[x];
        }
    }
    return null;
}

function modelUpdateMovie(id, name, mRated, year, pRating, genre, isChecked) {
    let movieToEdit = modelGetMovie(id);
    if (movieToEdit) {
        movieToEdit.name = name;
        movieToEdit.mRated = mRated;
        movieToEdit.year = year;
        movieToEdit.pRating = pRating;
        movieToEdit.genre = genre;
        movieToEdit.isChecked = isChecked;
        return movieToEdit;
    }
    return null;
}

function modelDeleteMovie(id) {
    for (x in movieList) {
        if (movieList[x].id === id) {
            movieList.splice(x, 1);
        }
    }
}