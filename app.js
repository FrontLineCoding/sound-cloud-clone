const cors =require('cors');
const express = require('express');

const app = express();

app.use(cors({
    origin: ["<website URL>"]
}));

app.use(express.json());

app.use('/albums', require('./routes/albums'));
app.use('/artists', require('./routes/artists'));
app.use('/playlists', require('./routes/playlists'));
app.use('/songs', require('./routes/songs'));
app.use('/users', require('./routes/users'));

const port = 5000;
app.listen(port, ()=> console.log(`Listening on port: ${port}`));
