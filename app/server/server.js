const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const favicon = require('serve-favicon');
const products = require('./routes/api/products-router');
const users = require('./routes/api/users-router');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//DB Config
const db = require('../../config/keys').mongoURI;
//Connect to MongoDB
mongoose
  .set('useFindAndModify', false)
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`MongoDB Connected`))
  .catch((err) => console.log(`Error: `, err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('../../config/passport')(passport);

app.use('/api/products', products);
app.use('/api/users', users);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(favicon('app/client/build/favicon.ico'));
  app.use(express.static('app/client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'app/client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
