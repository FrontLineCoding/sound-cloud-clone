const express = require('express');
const app = require('../../app');
const { Song, User, Artist, Album, Comment, Playlist} = require('../../db/models');

const router = express.Router();
//TODO: Make dryer by adding a checkIfArtistExsists
//Get all songs by an artistId
router.get('/:artistId/songs', async (req,res) => {
    const { artistId } = req.params;

    const artist = await User.findOne({
        where: {id: artistId}
        });
    if(!artist){
        const err = new Error('Artist cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    }


    const songsByArtist = await Song.findAll({
        where: {userId: artistId}
    });


    const payload = {
        Songs: songsByArtist
    }
    res.json(payload);
});

//get all albums by artistId
router.get('/:artistId/albums', async (req,res) => {
    const { artistId } = req.params;

    const artist = await User.findOne({
        where: {id: artistId}
        });
    if(!artist){
        const err = new Error('Artist cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    }
    const albumsByArtist = await Album.findAll({
        where: {userId: artistId}
    });

    const payload= {
        Albums: albumsByArtist
    }
    res.json(payload);
});


//get all playlist created by artist by artistID
router.get('/:artistId/playlists', async (req,res) => {
    const { artistId } = req.params;

    const artist = await User.findOne({
        where: {id: artistId}
        });
    if(!artist){
        const err = new Error('Artist cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    }

    const playlistsByArtist = await Playlist.findAll({
        where: {userId: artistId}
    });


    const payload= {
        Playlists: playlistsByArtist
    }
    res.json(payload);
});

//get details of an artist by id
router.get('/:artistId', async (req, res) => {
    const { artistId } = req.params;
    let totalSongs, totalAlbums;

    const artist = await User.findOne({
        where: {id: artistId}
    });
    if(!artist){
        const err = new Error('Artist cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    }
console.log(artist);
    if(!(artist.isArtist)){
        const err = new Error('This person is not an artist')
        return res.json(err.message);
    };

    totalSongs = await Song.findAll({
        where: {userId: artistId}
    });
    totalAlbums = await Album.findAll({
        where: {userId: artistId}
    });

    const payload = {
        id: artist.id,
        username: artist.username,
        totalSongs: totalSongs.length,
        totalAlbums: totalAlbums.length,
        previewImage: artist.previewImage
    }

    return res.json(payload)
});



module.exports = router;
