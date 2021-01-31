"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
require("dotenv").config();

var MongoClient = require("mongodb").MongoClient;

fs = require("fs");

module.exports = function (on, config) {
  on("task", {
    getData: function getData(_ref) {
      var collection = _ref.collection,
          filter = _ref.filter;
      return new Promise(function (resolve) {
        MongoClient.connect("mongodb+srv://".concat(MONGO_USER, ":").concat(MONGO_PASSWORD, "@moviesdb.w5jju.mongodb.net/<dbname>?retryWrites=true&w=majority"), function (err, client) {
          if (err) {
            console.log("MONGO CONNECTION ERROR: ".concat(err));
            throw err;
          } else {
            var db = client.db("my_db");
            console.log("Collection --- " + collection + "   --- filter --- " + JSON.stringify(filter));
            var i = 0;

            try {
              fs.unlinkSync("cypress/fixtures/responses.json");
            } catch (err) {
              console.log("Error while deleting the responses.json file." + err);
            }

            db.collection(collection).find({
              key: filter
            }).toArray(function (error, docs) {
              if (error) {
                console.log("Error while fetching documents from collection.");
                return;
              }

              console.log(docs);
              docs = docs.reduce(function (docs, e) {
                return _objectSpread({}, docs, _defineProperty({}, e.key, e));
              }, {});
              fs.appendFile("cypress/fixtures/responses.json", JSON.stringify(docs), "utf8", function (err) {
                if (err) throw err;
                console.log("Data is appended to file successfully.");
                resolve("");
                client.close();
              });
            });
          }
        });
      });
    }
  });
};