 
 const url = "https://moviesmern.herokuapp.com" ;
 
 let loading = document.getElementById("loading") ;

 function showLoading () {
  loading.style.display = "block" ;
 };

 function hideLoading () {
  loading.style.display = "none" ; 
 };

 async function getApi () {
     try {
       showLoading () ;
       return await fetch (`${url}/movies/all`)
      .then(response => response.json())
      .then(response => response.data)
     }
      catch (err) {
      return err ;
     }

     finally {
      hideLoading () ;
     }
 };

let mainContainer = document.getElementById("mainContainer");

 function displayMovies (moviesArray) {
 for (let movie of moviesArray){
 mainContainer.innerHTML+=
`<div class= "moviesContainer">
<img class="pics" src="${movie.image}">
<p>Name: ${movie.movieName}</p>
<p>Rating : ${movie.rating}</p>
<button class="Btns" type="button" onclick="deleteMovieById('${movie._id}')">Delete</button> 
<button class="Btns" type="button" onclick="getMovieDetalis('${movie._id}')">Read more</button>
</div>`
}
}; 

getApi()
.then(res => displayMovies(res))

async function deleteMovieById (id) {
let options = {
  method : `DELETE` 
}
 try {
       showLoading () ;
       return await fetch(`${url}/movies/movie/${id}`, options)
      .then(response => response.json())
}
catch (err) {
     return err ;
}
finally {
  hideLoading () ;
}
};



function displayMoviesSortedByName (moviesArray) {
for (let movie of moviesArray.sort((a,b) => a.movieName - b.movieName)){
mainContainer.innerHTML+=
`<div class= "moviesContainer">
<img class="pics" src="${movie.image}">
<p>Name: ${movie.movieName}</p>
<p>Rating: ${movie.rating}</p>
<button class = "Btns" type="button" onclick="deleteMovieById('${movie._id}')">Delete</button>
<button class="Btns" type="button" onclick="getMovieDetalis('${movie._id}')">Read more</button>
</div>`
}
};

function displayMoviesSortedByRating (moviesArray) {
for (let movie of moviesArray.sort((a,b) => b.rating - a.rating)){
mainContainer.innerHTML+=
`<div class= "moviesContainer">
<img class="pics" src="${movie.image}">
<p>Name: ${movie.movieName}</p>
<p>Rating: ${movie.rating}</p>
<button class = "Btns" type="button" onclick="deleteMovieById('${movie._id}')">Delete</button>
<button class="Btns" type="button" onclick="getMovieDetalis('${movie._id}')">Read more</button>
</div>`
}
};

function displayMoviesSortedByDate (moviesArray) {
for (let movie of moviesArray.sort((a,b) => b.date - a.date)){
mainContainer.innerHTML+=
`<div class= "moviesContainer">
<img class="pics" src="${movie.image}">
<p>Name: ${movie.movieName}</p>
<p>Rating: ${movie.rating}</p>
<button class = "Btns" type="button" onclick="deleteMovieById('${movie._id}')">Delete</button>
<button class="Btns" type="button" onclick="getMovieDetalis('${movie._id}')">Read more</button>
</div>`
}
};

function clearScreen () {
mainContainer.innerHTML = "" ;
};

let select = document.getElementById("select");

select.onchange = () => {
    switch (select.value) {
      
        case "name" : 
          clearScreen ();
          getApi()
         .then(res =>  displayMoviesSortedByName(res))
        break ;

        case "rating" : 
          clearScreen ();
          getApi()
         .then(res => displayMoviesSortedByRating(res))
        break;

        case "date" : 
          clearScreen ();
          getApi()
         .then(res => displayMoviesSortedByDate(res))
         break;
    }
};

async function findMovieByInput (movieName) {
  try {
  showLoading () ;
  return await fetch (`${url}/movies/movie/searchByName/${movieName}`)
  .then(response => response.json())
  .then(response => response.data)
  }
  catch (err) {
  return err ;
  }
  finally {
    hideLoading () ;
  }
};

let input = document.getElementById("input") ;

 input.oninput = () => {
    clearScreen ();
    findMovieByInput(input.value)
   .then(response => displayMovies(response))
 };



async function getMovieDetalis (id) {
  try {
    showLoading () ;
    return await fetch (`${url}/movies/movie/${id}`)
   .then(response => response.json())
   .then(response => response.data)
   .then(response => displayMovieDetalis(response))
  }

  catch (err) {
  return err ;
  }
  finally {
    hideLoading () ;
  }
}

function displayMovieDetalis (movie) {
   mainContainer.innerHTML = 
   `<div class= "moviesContainer">
   <img class="pics" src="${movie.image}">
   <p>Name: ${movie.movieName}</p>
   <p>Rating : ${movie.rating}</p>
   <p>Preview : ${movie.synopsis}</p>
   <p><a class="movielink" href = "${movie.linkToMovie}" target="blank">Read More</a></p>
   <button class="Btns" type="button" onclick="deleteMovieById('${movie._id}')">Delete</button>
   <button class ="Btns" type="button" onclick="returnTomainPage()">back</button>
   </div>`
}

function returnTomainPage () {
clearScreen() ;
getApi()
.then(res => displayMovies(res))
};


