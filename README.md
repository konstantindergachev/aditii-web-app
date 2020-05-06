# aditii-web-app

Aditii is an example of an e-commerce website that was created using Mongo, Express, React, and NodeJS.

- [Website](http://aditii.herokuapp.com)

## Quick start

# Step 1 Clone repo
git clone git@github.com:konstantindergachev/aditii-web-app.git

# Step 2 Install dependencies
yarn install or npm install

# Step 3 To hosting images I use Cloudinary 
[cloudinary](https://cloudinary.com/)
# Step 4 In this project data stored in the atlas mongodb cloud
For development mode, you need to create keys_dev.js file in the config folder:
```sh
  module.exports = {
    imageUrl: './app/client/src/img/uploads/',
    cloud_name: '**********',                   <- cloudinary
    api_key: '**********',                      <- cloudinary
    api_secret: '***********',                  <- cloudinary
    baseUrl: 'http://localhost:3000',
    emailFrom: '**********',                    <- email for nodemailer
    emailPass: '**********',                    <- password for email
    mongoURI: '**********',                     <- atlas mongodb cloud
    secretOrKey: '**********',                  <- secret string for token bcrypt
  };
```
# Step 5 Use your own social icons and favicon.ico
# Step 6 Start back-end and front-end at the same time in the development mode with hot reloading enabled
 yarn run dev or npm run dev

# Step 7 Deploy to Heroku: Cloud Application Platform
[heroku](https://www.heroku.com/)


## Info
### Author
Konstantin Dergachev [portfolio](http://dergachevkonstantin.surge.sh/).