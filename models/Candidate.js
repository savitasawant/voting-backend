const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, default: null},
    age: { type: Number, default: null },
    total_vote: {type: Number, default: 0},
    contact: {type: Number, default:null},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('candidate', candidateSchema);
