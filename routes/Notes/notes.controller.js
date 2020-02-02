import Note from '../../Models/Note';
import Error from '../../Helpers/Errors';
import schedule from 'node-schedule';

const deleteNote = (id, deleteAt) => {
    let date = new Date(deleteAt);

    let j = schedule.scheduleJob(date, () => {
        Note.deleteOne({_id: id}).then(result => {
            if (result.n > 0) {
                console.log('deleted')
            } else {
                console.log('not deleted')
            }
        });
    });
};


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
    const currentDate = new Date();
    const newNoteData = {
      note: req.body.note,
    };
    const deletedAt = req.body.deletedAt;
    if (deletedAt) {
        newNoteData.deleteAt = deletedAt;
    }
    const NewNote = Note({
        note: newNoteData.note,
        deletedAt: newNoteData.deleteAt
    });
    NewNote.save().then(result => {
        if (result.deletedAt) {
            if (result.deletedAt > currentDate) {
                deleteNote(result._id, deletedAt);
            }
        }
        return res.status(200).json({
            result: result
        });
    }).catch(err => {
        Error.errorHandling(res, 400, err);
    })

};

exports.update = (req, res) => {
    const currentDate = new Date();
    const newNoteData = {
        note: req.body.note,
        lastUpdatedAt: currentDate
    };
    const deletedAt = req.body.deletedAt;
    if (deletedAt) {
        newNoteData.deletedAt = deletedAt;
        if (deletedAt.getTime() > currentDate.getTime()) {
            deleteNote(req.params.id, deletedAt);
        }
    }
    Note.updateOne({_id: req.params.id}, newNoteData).then(result => {
        if (result.nModified > 0) {
            return res.status(200).json({ messages: 'Update successful!' });
        }
    }).catch(err => {
        Error.errorHandling(res, 400, err);
    })

};

exports.delete = (req, res) => {
    const id = req.params.id;
    const deletedAt = new Date(req.body.date);
    const currentDate = new Date();
    if (deletedAt > currentDate) {
        deleteNote(id, deletedAt);
    }
};
