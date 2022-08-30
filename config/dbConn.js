const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDB;
/*   useNewUrlParser, useUnifiedTopology, useFindAndModify, 
     and useCreateIndex are no longer supported options. 
     Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true,
      and useFindAndModify is false.
     Please remove these options from your code. */
