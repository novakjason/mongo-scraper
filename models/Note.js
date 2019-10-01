const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    _headlineID: {
        type: Schema.Types.ObjectId,
        ref: "Article",
    },
    noteText: String
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;