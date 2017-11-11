var mongoose = require('mongoose');

var board = mongoose.Schema({
    writer: { type: String, required: true, unique: false },
    password: String,
    lock: { type: Boolean, default: false },
    title: { type: String, required: true, unique: true },
    code: String,
    explanation: String,
    date: { type: Date, default: Date.now },
    saved: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    comment: [{
        name: String,
        memo: String,
        date: { type: Date, default: Date.now }
    }]
});

board.methods.name = function () {
    return this.writer;
};

module.exports = mongoose.model('Board', board)
