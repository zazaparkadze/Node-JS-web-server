const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleUsers = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd)
        return res
            .status(400)
            .json({ message: 'username and password are required!!!' });
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(309); // conflict,,,, choose another username
    try {
        const hashedPassword = await bcrypt.hash(pwd, 10);
        const newUser = await User.create({
            username: user,
            password: hashedPassword,
        });
        console.log(newUser);
        res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
    }
};
module.exports = { handleUsers };
