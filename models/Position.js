const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const positionSchema = new Schema({
  name: { type: String, required: true },
  candidates: [{ type: ObjectId, ref: 'candidate' }]
});

module.exports = mongoose.model('position', positionSchema);