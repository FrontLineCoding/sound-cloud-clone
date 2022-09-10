# SoundCloud Project
  This SoundCloud clone is a clone in the fact that it is a music web app. Styling and UX is all custom.
  A user can log in as the "Demo" user or can sign up then log in.

  Feel free to explore at [Music App](https://sound-cloud-clone-flc.herokuapp.com/) or run locally

## Running Music App on local server
  - Clone repo from [GitHub](https://github.com/FrontLineCoding/sound-cloud-clone)
  - cd into the backend folder and run `npm install` in terminal
    - create a .env file inside the backend folder with the following
    - PORT= whatever you want (suggestion : **8000**)
    - DB_FILE = path to a database (suggestion : db/dev.db or *any db name*)
    - Make sure you have the **sequelize-cli** installed
    - run `dotenv npx sequelize db:migrate`
    - run `dotenv npx sequelize db:seed:all`
    - start backend server by running `npm start`
  - cd into the frontend folder and run `npm install` in terminal
    - start frontend server by running `npm start`

## Technologies
  - Node JS
  - Csurf JS
  - BCrypt JS
  - Express
  - Sequelize
  - SQLite3
  - React
  - Redux

## Features
  - Sign-up, log in with your account, and log in with a "Demo Account"
  - Authentication required for creating, updating, and deleting
  - Create, read, update, and delete **Songs** (CRUD)
  - Create, read, update, and delete **Albums** (CRUD)
  - Upload the image and audio file to the song
  - Upload an image for an album cover to the album
  - Navitgate to a song from selected album

## ScreenShots
