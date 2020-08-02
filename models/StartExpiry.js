const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const startexpirySchema = new Schema({
    start_date: { type: String, required: true },
    expiry_date: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('startexpiry', startexpirySchema);
