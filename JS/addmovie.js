class Movie {
movieName ;
rating ;
image ;
linkToMovie ;
synopsis ;
constructor (moviename , rating , image , data , synopsis){
    this.movieName = moviename ;
    this.rating = rating ;
    this.image = image ;
    this.linkToMovie = data ;
    this.synopsis = synopsis ;
}
};

const url = "https://moviesmern.herokuapp.com" ;

 async function SendUserMovie (useroptions) {
     try {
     return await fetch (`${url}/movies/saveMovie`,useroptions)
     .then(response => response.json())
     }

     catch (err) {
     return err ;
     }
 };


let formBtn = document.getElementById("btn");
let movie ;
formBtn.onclick = () => {
movie = new Movie (movieName.value , rating.value , image.value , linkToMovies.value , synopsis.value);
let options = {
method : "POST" , 
body : JSON.stringify({movie}) ,
headers: {"Content-Type" : "application/json"} ,
};
SendUserMovie(options)
.then(res => console.log(res))
.catch(rej => console.log(rej))
};

