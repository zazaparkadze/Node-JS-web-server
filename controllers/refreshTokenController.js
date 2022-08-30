const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(403);

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (foundUser) {
        //verify jwt refreshToken
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || decoded.username !== foundUser.username)
                    return res.sendStatus(403);
                const roles = Object.values(foundUser.roles);
                const accessToken = jwt.sign(
                    {
                        userInfo: {
                            username: decoded.username,
                            roles: roles,
                        },
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '180s' }
                );
                res.json({ accessToken });
            }
        );
    }
};

module.exports = { handleRefreshToken };
