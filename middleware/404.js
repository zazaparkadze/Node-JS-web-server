const notFoundHandler = (err, req, res, next) => {
    res.status(404);

    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }

    if (req.accepts('json')) {
        res.json({ error: '404 , not found' });
    }

    res.type('txt').send('page not found');
    next();
};

module.exports = notFoundHandler;
