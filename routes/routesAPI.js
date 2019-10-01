const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {

    app.get("/api/scrape", function (req, res) {

        axios.get("https://www.nytimes.com/section/movies").then(function (response) {

            const $ = cheerio.load(response.data);
            console.log("hello");
            const articles = [];

            $("#stream-panel").find("a").each(function (i, element) {
                if(i > 8) {
                    return;
                }

                let article = {};

                article.link = $(element).attr("href").trim();
                article.headline = $(element).children("h2").text().trim();
                article.summary = $(element).children("p").text().trim();
                articles.push(article);
                console.log(article);
            });
            
            console.log(articles);
            res.json(articles);

        });
    });

};