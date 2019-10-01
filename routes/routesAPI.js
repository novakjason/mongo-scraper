const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function (app) {

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

};