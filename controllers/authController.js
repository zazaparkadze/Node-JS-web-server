const User = require('../model/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    try {
        //verify user
        const { user, pwd } = req.body;
        if (!user || !pwd)
            return res.status(400).json('username and password are required');
        const foundUser = await User.findOne({ username: user }).exec();
        if (!foundUser) return res.sendStatus(401);
        //verify password
        const match = await bcrypt.compare(pwd, foundUser.password);
        if (match) {
            // jwt
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    userInfo: {
                        username: foundUser.username,
                        roles: roles,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '180s' }
            );
            const refreshToken = jwt.sign(
                {
                    username: foundUser.username,
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // write refreshToken with user, in db
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
            console.log(result);

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                //  secure: true, sameSite: none,
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({ accessToken });

            console.log(`user ${user} is logged successfully!`);
        } else {
            res.status(401).json({ message: 'incorrect password' });
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = { handleLogin };
