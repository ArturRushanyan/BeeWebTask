import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    note: { type: String, required: true },
    createdAt: { type : Date, default: Date.now },
    lastUpdatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date }
});

let Note = null;

try {
    Note = mongoose.model('Notes', NoteSchema);
} catch(e) {
    Note = mongoose.model('Notes');
}

module.exports = Note;
