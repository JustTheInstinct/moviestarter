/*
 Authors:
 Your name and student #: Jordan Gavinchuk
 Your Partner's Name and student #: ---
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs =  require("fs")

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// List of movies
let movie_list = []

app.get("/", (req, res) => res.render("pages/index", {movie_list}));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  //Add your implementation here 
  let {movies} = req.body
  movie_list = movies.split(",")
  console.log(movie_list)
  res.redirect("/")
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  let searches = []
  for (let search in req.seach) {
    searches.append(req.search[search])
  }
  movie_list = searches
  res.redirect("/")
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  let query = req.params.
  fs.readFile("./movieDescriptions.txt", (err, data) => {
    if (err) {
      console.log(err.message)
    }
    else {
      let provided_list = file.split("\n")
      let check = false
      for (let i = 0; i < provided_list.length; i++) {
        //string breakup
        let current = provided_list[i].split(":")
        let title = current[0]
        let desc = current[1]
        //Checks if exists
        if (title.toUpperCase() == query.toUpperCase) {
          check = true
          res.render("pages/searchResult", query, desc)
          return;
        }
      }
      if (check = false) {
        res.render("pages/searchResult", {title:null, desc:"does not exist"})
      }
    }
  })
  res.redirect("/")
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});