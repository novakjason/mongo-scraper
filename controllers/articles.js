const Article = require("../models/Article");

module.exports = {
    fetch: callback => {
        scrape(data => {
            let articles = data;
            for (var i = 0; i < articles.length; i++) {
                articles[i].saved = false;
            }
            Article.collection.insertMany(articles, { ordered: false }, (err, docs) => callback(err, docs))
        });
    },
    delete: (query, callback) => Article.remove(query, callback),
    get: (query, callback) => Article.find(query).sort({ _id: -1 }).exec((err, doc) => callback(doc)),
    update: (query, callback) => Article.update({ _id: query._id }, { $set: query }, {}, callback)
};