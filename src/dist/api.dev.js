"use strict";

var API_KEY = process.env.API_KEY;
var api_uri = "http://www.omdbapi.com/?apikey=".concat(API_KEY);

exports.fetchAPI = function (search) {
  return fetch(api_uri + "&s=" + search).then(function (res) {
    res.json();
    console.log(res.json());
  });
};