
async function getApi () {
    try {
     return await fetch ("https://moviesmern.herokuapp.com/movies/all")
     .then(response => response.json())
    }
    catch (err) {
     return err ;
    }
};
getApi()
.then(res => console.log(res))
.catch(rej => console.log(rej))

let moviesTable = document.getElementById("table");

function displayMoviesTable (moviesArray) {
    for (let movie of moviesArray.data){
        moviesTable.innerHTML+=
        `<tr>
        <td>${movie.image}</td>
        <td>${movie.movieName}</td>
        <td>${movie._id}</td>
        <td>${movie.rating}</td>
        <td>${movie.date}</td>
        <td>${movie.synopsis}</td>
        </tr> `
    };
};

getApi()
.then(res => displayMoviesTable(res))
.catch(rej => console.log(rej))