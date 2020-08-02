const User = require('../models/User');

exports.createUser = async (req, res) => {
  try{
    let { data } = req.body;

    let isUserExists = await User.countDocuments({ 'email': data.email });
    if (isUserExists) return res.status(422).json({ 'status': 'error', 'message': 'A user already exists for given email address.' });

    let user = await User.create(data);
    if (!user) return res.status(422).json({ 'status': 'error', 'message': 'User has creation failed.' });

    // Strip password field from user's response object 
    user.password = undefined;

    return res.status(200).json({ 'status': 'success', 'data': user });
  }
  catch (err){
    console.error(`An error occurred while adding a user: ${err}`);
    return res.status(500).json({ 'status': 'error', 'message': 'Something went wrong, try again later.' });
  }
}