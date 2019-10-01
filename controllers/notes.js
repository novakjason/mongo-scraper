const Note = require("../models/Note");

module.exports = {
    get: (data, callback) => Note.find({ _headlineID: data._id }, callback),
    save: (data, callback) => {
        let newNote = {
            _headlineID: data._id,
            noteText: data.noteText
        };

        Note.create(newNote, (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                console.log(doc);
                callback(doc);
            }
        });
    },
    delete: (data, callback) => Note.remove({ _id: data._id }, callback)
};