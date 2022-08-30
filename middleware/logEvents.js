const { v4: uuid } = require('uuid');
const { format } = require('date-fns');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (mess, fileName) => {
    const dateTime = format(new Date(), 'yyyy/MM/dd\tHH:mm:ss');
    const message = `${dateTime}\t${uuid()}\t${mess}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'log'))) {
            fs.mkdir(path.join(__dirname, '..', 'log'), () =>
                console.log('direstory created')
            );
        }
        await fsPromises.appendFile(
            path.join(
                __dirname,
                '..',
                'log',
                `${fileName}_requests_logFile.txt`
            ),
            message
        );
    } catch (err) {
        console.error(err);
    }
};

const logger = (req, res, next) => {
    logEvents(
        `${req.url}\t${req.method}\t${req.headers.origin}`,
        `${req.method}`
    );
    next();
};

module.exports = { logEvents, logger };
