import Note from '../../Models/Note';
import Error from '../../Helpers/Errosr';

exports.getAll = (req, res) => {
    Note.find().then(notes => {
        return res.status(200).json({
            notes
        })
    }).catch(err => {
        Error.errorHandling(res, 400, err);
    });
};

exports.getById = (req, res) => {
    const noteId = req.params.id;
    Note.findById(noteId).then(note => {
        return res.status(200).json({
            note
        })
    }).catch(err => {
        Error.errorHandling(res, 400, err);
    });
};

exports.create = (req, res) => {
    const newNoteData = {
      note: req.body.note,
      deleteAt: req.body.deleteAt
    };
    const NewNote = Note({
        note: newNoteData.note,
        deletedAt: newNoteData.deleteAt
    });
    NewNote.save().then(data => {
        return res.status(200).json({
            data: data
        });
    }).catch(err => {
        Error.errorHandling(res, 400, err);
    })

};

exports.update = (req, res) => {
    const newNoteData = {
        note: req.body.note,
        deleteAt: req.body.deleteAt
    };
    Note.updateOne({_id: req.params.id}, newNoteData).then(result => {
        if (result.nModified > 0) {
            return res.status(200).json({ messages: 'Update successful!' });
        }
    }).catch(err => {
        Error.errorHandling(res, 400, err);
    })

};

exports.delete = (req, res) => {

};
