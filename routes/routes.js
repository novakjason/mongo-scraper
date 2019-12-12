const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = app => {

    app.get("/", (req, res) => res.render("home"));
    
    app.get("/saved", (req, res) => res.render("saved"));

    app.get("/api/scrape", function (req, res) {

        axios.get("https://www.nytimes.com/section/movies").then(function (response) {

            const $ = cheerio.load(response.data);

            const articles = [];

            $("#stream-panel").find("a").each(function (i, element) {
                if (i > 8) {
                    return;
                }

                let article = {};

                article.link = $(element).attr("href").trim();
                article.headline = $(element).children("h2").text().trim();
                article.summary = $(element).children("p").text().trim();
                articles.push(article);

                // create a new Article using the `article` object built from scraping
                db.Article.create(article)
                    .then(function (dbArticle) {
                        // view the added result in the console
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // if an error occurred, log it
                        console.log(err);
                    });
            });
            res.json(articles);
        });
    });

    // route for getting all unsaved Articles from the database
    app.get("/api/articles", function (req, res) {

        // grab every document in the Articles collection
        db.Article.find({ saved: false })
            // sorting by most recently scraped articles
            .sort("createdAt")
            .then(function (dbArticle) {
                // if we were able to successfully find Articles, send them back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // if an error occurred, send it to the client
                res.json(err);
            });

    });

    // route to get all saved articles from the database
    app.get("/api/articles/saved", function (req, res) {
        db.Article.find({ saved: true })
            // sorting by most recently saved article
            .sort("updatedAt")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // route to save article by id
    app.post("/api/save/:id", function (req, res) {
        db.Article.findByIdAndUpdate(req.params.id, { saved: true })
          .then(function(dbArticle) {
              res.json(dbArticle);
          })
          .catch(function(err) {
              res.json(err);
          });
    });

    // route to unsave article by id
    app.post("/api/unsave/:id", function (req, res) {
        db.Article.findByIdAndUpdate(req.params.id, { saved: false })
          .then(function(dbArticle) {
              res.json(dbArticle);
          })
          .catch(function(err) {
              res.json(err);
          });
    });
    
};