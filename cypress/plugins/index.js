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
const MongoClient = require("mongodb").MongoClient;
fs = require("fs");
module.exports = (on, config) => {
  on("task", {
    getData({ collection, filter }) {
      return new Promise((resolve) => {
        MongoClient.connect(
          `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@moviesdb.w5jju.mongodb.net/<dbname>?retryWrites=true&w=majority`,
          (err, client) => {
            if (err) {
              console.log(`MONGO CONNECTION ERROR: ${err}`);
              throw err;
            } else {
              const db = client.db("my_db");
              console.log(
                "Collection --- " +
                  collection +
                  "   --- filter --- " +
                  JSON.stringify(filter)
              );
              let i = 0;
              try {
                fs.unlinkSync("cypress/fixtures/responses.json");
              } catch (err) {
                console.log(
                  "Error while deleting the responses.json file." + err
                );
              }
              db.collection(collection)
                .find({ key: filter })
                .toArray(function (error, docs) {
                  if (error) {
                    console.log(
                      "Error while fetching documents from collection."
                    );
                    return;
                  }
                  console.log(docs);

                  docs = docs.reduce(
                    (docs, e) => ({ ...docs, [e.key]: e }),
                    {}
                  );
                  fs.appendFile(
                    "cypress/fixtures/responses.json",
                    JSON.stringify(docs),
                    "utf8",
                    function (err) {
                      if (err) throw err;
                      console.log("Data is appended to file successfully.");
                      resolve("");
                      client.close();
                    }
                  );
                });
            }
          }
        );
      });
    },
  });
};
