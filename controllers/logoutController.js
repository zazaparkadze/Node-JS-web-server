const User = require('../model/User');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();

    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', {
        httpOnly: true,
        // sameSite: 'none', secure: true
    });
    res.status(200).json({
        message: `user ${foundUser.username} is logged out !!!!`,
    });
};

module.exports = { handleLogout };
