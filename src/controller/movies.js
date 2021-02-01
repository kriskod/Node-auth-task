const Movie = require("../model/movie");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const { API_KEY } = process.env;

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ movies });
  } catch (error) {
    res.status(404).json({ message: "NO entries found" });
  }
};

exports.getMovie = async (req, res) => {
  url = `http://www.omdbapi.com/?apikey=${API_KEY}&`;
  movie = req.params.title;
  params = new URLSearchParams(`s=${movie}`);
  try {
    let data = await fetch(`${url}&${params}`);
    json_data = data.json();
    console.log(json_data);
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ messagge: "No entries" });
  }
};

exports.createMovie = async (req, res) => {
  const newMovie = new Movie({
    _id: new mongoose.Types.ObjectId(),
    Title: req.body.Title,
    Released: req.body.Released,
    Genre: req.body.Genre,
    Directory: req.body.Directory,
  });

  try {
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
