function onPageLoad() {
    // Wired cancel button
    document.getElementById("cancelBtn").onclick = clearInput;
    document.getElementById("addMovieBtn").onclick = onAddMovie;
    // Hides the edit form
    document.getElementById("movieEditArea").style.display = "none";
    // Generates default model data.
    addTableRow(modelCreateMovie("Solo: A Star Wars Story", "pg-13", "2018", 3, "sciFan", false));
    addTableRow(modelCreateMovie("Jurassic World", "pg-13", "2015", 4, "actAdv", true));
    addTableRow(modelCreateMovie("Me Before You", "pg-13", "2016", 2, "romance", false));
    addTableRow(modelCreateMovie("Hot Rod", "pg-13", "2007", 4, "comedy", false));
    addTableRow(modelCreateMovie("Onward", "pg", "2020", 5, "sciFan", true));
    
    document.getElementById("year").max = new Date().getFullYear(); 
    
    }
    
    function clearInput() {
        // clear input data
        //clear any errors
        // hide form, show list table
    
        const {nameEdit, mRated, year, pRating, isBlueray} = document.forms["movieEditForm"];
        // Clears input form
        nameEdit.value = "";
        mRated.selectedIndex = 0;
        year.value = "";
        pRating.selectedIndex = 0;
        let radioChecked = document.querySelector('input[name="genreRadio"]:checked');
        if (radioChecked) {
            radioChecked.checked = false;
        }
        isBlueray.checked = false;
    
        // Erases any errors
        document.getElementById("mRatedError").innerHTML = "";
        document.getElementById("nameError").innerHTML = "";
        document.getElementById("yearError").innerHTML = "";
        document.getElementById("pRatingError").innerHTML = "";
        document.getElementById("radioError").innerHTML = "";
    
        document.getElementById("movieListArea").style.display = "block";
        document.getElementById("movieEditArea").style.display = "none";    
    }
    
    function addTableRow(movie) {
        const {id, name, mRated, pRating, isChecked} = movie;
        let table = document.getElementById("moviesTable");
        let row = table.insertRow(table.rows.length);
        row.id = "row" + id;
        let updateRow = document.getElementById(row.id);
        
        row.insertCell(0).innerText = name;
        row.insertCell(1).innerText = mRated.toUpperCase();
        row.insertCell(2).innerText = "";
        addStars(pRating.toString(), updateRow.childNodes[2]);
        row.insertCell(3).innerText = movieFormat(isChecked) 
    
        // Create the edit and delete buttons
        let editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.innerText = "Edit";
        editBtn.classList.add("editBtn");
        editBtn.onclick = function() {
            onEditBtn(id);
        };
        row.insertCell(4).appendChild(editBtn);
        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = function() {
            onDeleteBtn(id);
        }; 
        row.insertCell(5).appendChild(deleteBtn);
    
        // Applying css
        row.childNodes[1].classList.add("centerText");
        // row.childNodes[2].classList.add("centerText");
        row.childNodes[3].classList.add("centerText");
        row.childNodes[4].classList.add("tableBtns");
        row.childNodes[5].classList.add("tableBtns");
    }
    
    function onAddMovie() {
        // Hide data list, show edit form.
        document.getElementById("movieListArea").style.display = "none";
        document.getElementById("movieEditArea").style.display = "block";
        document.getElementById("formTitle").innerHTML = "New Movie";
    
        document.getElementById("saveBtn").onclick = function() {
            onSaveBtn();
        };
    }
    
    function onEditBtn(movieId) {
        // Hide data table, show input form
        // Fill in all the data with input form
        // Wire up save btn
        document.getElementById("movieListArea").style.display = "none";
        document.getElementById("movieEditArea").style.display = "block";
    
        const {name, mRated, year, pRating, genre, isChecked} = modelGetMovie(movieId);
    
        let form = document.forms["movieEditForm"];
        document.getElementById("formTitle").innerHTML = "Edit Movie";
        form.nameEdit.value = name;
        form.mRated.selectedIndex = getSelectIndex("mRated", mRated);
        form.year.value = year;
        form.pRating.selectedIndex = getSelectIndex("pRating", pRating);
        form.genreRadio.value = genre;
        form.isBlueray.checked = isChecked;
        document.getElementById("saveBtn").onclick = function() {
            onSaveBtn(movieId);
        }
    }
    
    function onSaveBtn(id) {
        // Validate input DONE
        // Show appropriate errors DONE
        // if no errors, clear form DONE
        // hide edit form, show data table with
        // updated results.
        validateForm();
        if (!validateForm()) {
            document.getElementById("saveError").innerText = "Please fix errors above";
            return;
        }
        document.getElementById("saveError").innerText = "";
        if (id) {
        // Update current movie
         let movie = modelGetMovie(id);
            let form = document.forms["movieEditForm"];
            movie.name = form.nameEdit.value;
            movie.mRated = form.mRated.value;
            movie.year = form.year.value;
            movie.pRating = form.pRating.value;
            movie.genre = form.genreRadio.value;5
            movie.isChecked = form.isBlueray.checked;
            updateTable(movie);
        } else {
        // Get the data from the form and add to movie list
            const {nameEdit, mRated, year, pRating, genreRadio, isBlueray} = 
                document.forms["movieEditForm"];
    
            let newMovie = modelCreateMovie(nameEdit.value, mRated.value, 
                year.value, pRating.value, genreRadio.value, isBlueray.checked)
            
            addTableRow(newMovie);
        }
        clearInput();
        document.getElementById("movieListArea").style.display = "block";
        document.getElementById("movieEditArea").style.display = "none";   
    
    }
    
    // Returns the index of the selected drop down option.
    function getSelectIndex(list, value) {
        let mRatedList = document.getElementById(list).options;
        for (let i =0; i < mRatedList.length; i++) {
            if (mRatedList[i].value == value) {
                return i;
            }
        }
        return 0;
    }
    
    function validateForm() {
        let form = document.forms["movieEditForm"];
        let validated = true;
    
        if (!form.nameEdit.value) {
            document.getElementById("nameError").innerHTML = "Must enter name of movie.";
            validated = false;
        }else {
            document.getElementById("nameError").innerHTML = "";
        }
    
        if(form.mRated.selectedIndex === 0) {
            document.getElementById("mRatedError").innerHTML = "Select what the movie is rated.";
            validated = false;
        } else {
            document.getElementById("mRatedError").innerHTML = "";
        }
    
        if (!form.year.value) {
            document.getElementById("yearError").innerHTML = "Enter the production year of the film.";
            validated = false;
        } else if (!form.year.checkValidity()) {
            document.getElementById("yearError").innerHTML = form.year.validationMessage;
            validated = false;
        }else {
            document.getElementById("yearError").innerHTML = "";
        }
    
        if (form.pRating.selectedIndex === 0) {
            document.getElementById("pRatingError").innerHTML = "Provide your personal rating.";
            validated = false;
        } else {
            document.getElementById("pRatingError").innerHTML = "";
        }
        
        if (!document.querySelector('input[name="genreRadio"]:checked')) {
            document.getElementById("radioError").innerHTML = "Select the genre of the movie.";
            validated = false;
        } else {
            document.getElementById("radioError").innerHTML = "";
        }
        return validated;
    }
    
    function updateTable(movie) {
        const {name, mRated, pRating, isChecked} = movie;
        let rowId = "row" + movie.id;
        let row = document.getElementById(rowId);

        row.childNodes[0].innerText = name;
        row.childNodes[1].innerText = mRated.toUpperCase();
        row.childNodes[2].innerText = "";
        // row.childNodes[2].appendChild(img);
        addStars(pRating, row.childNodes[2]);
        row.childNodes[3].innerText = movieFormat(isChecked);
    }
    
    function movieFormat(bool) {
        if(bool) {
            return "Blue-Ray";
        }
        return "DVD";
    }
    
    function onDeleteBtn(id) {
        let movie = modelGetMovie(id);
        if (!movie) {
            alert("Error: Unable to find movie ID: " + id)
        }else {
            if (!confirm("Are you sure you want to delete the movie " + movie.name + "?"))
            return;
        let tableRow = document.getElementById("row" + id)
        tableRow.remove();
        modelDeleteMovie(id);
        }
    }

    function addStars(numStars, node) {
        for (i=0 ; i < numStars; i++) {
            let img = document.createElement("img");
            img.src = "/img/transparentStar.png";
            img.classList.add("starReview");
            node.append(img);
        }
    }


    