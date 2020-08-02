const User = require('../../models/User');

exports.register = async (req, res) => {
    try {
        const { data: { name, email, mobile, password, role } } = req.body;

        let existingUser = await User.countDocuments({ 'email': email });

        if (existingUser) {
            return res.json({ 'status': 'error', 'message': 'An user already exists with given email address.' });
        }

        User.create({ name, email, mobile, password, role }, (err, user) => {
            if (err) {
                console.error(`An error occurred while creating a user: ${err}`);
                return res.json({ 'status': 'error', 'message': 'Something went wrong, try again later.' });
            }
            return res.json({ 'status': 'success', 'message': 'User registration successful' });
        })
    }
    catch (err) {
        console.error(`An error occurred while registering a user: ${err}`);
        return res.status(500).json({ 'status': 'error', 'message': 'Something went wrong, try again later.' });
    }
}