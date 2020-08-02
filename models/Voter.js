const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voterSchema = new Schema({
  // ip_address: { type: String, required: true },
  name: {type: String, required: true},
  email: { type: String, default: null},
  votes: [
    {
      position: { type: String, require: true},
      selected_candidate: { type:String, required: true}
    }
  ]
});

module.exports = mongoose.model('vote', voterSchema);

