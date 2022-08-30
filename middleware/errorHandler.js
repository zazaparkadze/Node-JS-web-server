const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'ERR');
    res.status(500).send(err.stack);
    next();
};
module.exports = errorHandler;
