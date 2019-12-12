const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    saved: {
        type: Boolean,
        default: false
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }],
    link: {
        type: String,
        required: false,
        unique: true
    },
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;