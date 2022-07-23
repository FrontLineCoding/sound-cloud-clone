const express = require('express');
const { parseComplete } = require('pg-protocol/dist/messages');
const app = require('../../app');
const { Song, User, Artist, Album, Comment, Playlist, playlist_song} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { route } = require('./session');
const { handleValidationErrors, handleAddSongToAlbum } = require('../../utils/validation');
const { check } = require('express-validator');

const validateBody = [
    check('name')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Playlist name is required'),

     handleAddSongToAlbum
  ];

const router = express.Router();


//add a song to playlist - playlist must belong to current user
router.post('/:playlistId/songs', requireAuth, async (req, res) => {
    const { user } = req;
    const { songId } = req.body;
    const { playlistId } = req.params;
    //Error Handling Logic


    const song = await Song.findOne({
        where: {id: songId},
    });
    if(!song){
        const err = new Error('Song cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    };

    const playlist = await Playlist.findOne({
        where: {id: playlistId},
    });
    if(!playlist){
        const err = new Error('Playlist cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    };
    if(!(user.id === playlist.userId)){
        const err = new Error('This aint yers');
        res.status(403)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        });
    };

    //Adding the song to the playlist via a joins table
    const addedSong = await playlist_song.create({
        playlistId: parseInt(playlistId),
        songId
    });

    await addedSong.save();
    const payload = {
        id: addedSong.id,
        playlistId: parseInt(playlistId),
        songId
    };

    return res.json(payload);
});

//Edit a playlist - must belong to current user
router.put('/:playlistId', validateBody, requireAuth, async (req, res) => {
    const { user } = req;
    const { playlistId } = req.params;
    const { name, imageUrl } = req.body;
    const playlist = await Playlist.findByPk(playlistId);
    if(!playlist){
        const err = new Error('Playlist cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    };

    if(!(user.id === playlist.userId)){
        const err = new Error('This aint yers');
        return res.json(err.message);
    }

    playlist.name = name;
    playlist.previewImage = imageUrl;
    await playlist.save();
    return res.json(playlist);
});


//delete a playlist - must belong to current user
router.delete('/:playlistId', requireAuth, async (req, res) => {
    const { user } = req;
    const { playlistId } = req.params;
    const playlist = await Playlist.findByPk(playlistId);

    if(!playlist){
        const err = new Error('Playlist cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    }
console.log(playlist);
    if(!(user.id === playlist.userId)){
        const err = new Error('This aint yers');
        return res.json(err.message);
    }

    await playlist.destroy();

    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    });

});

//get details of playlist by playlistId
router.get('/:playlistId', async (req, res) => {
    const { playlistId } = req.params;

    const playlist = await Playlist.findOne({
        where: {id: playlistId},
        include: [{
            model: Song,
            attributes: ["id",
            "userId",
            "albumId",
            "title",
            "description",
            "url",
            "createdAt",
            "updatedAt",
            "previewImage"],
            through: {
                attributes: []
              }
        }]
    });

    if(!playlist){
        const err = new Error('Playlist cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    }


    res.json(playlist);
});


//get all current user's playlist
router.get('/session/user', requireAuth, async (req, res) => {
    const { user } = req;
    const playlists = await Playlist.findAll({
        where: {userId: user.id}
    })

    return res.json({Playlists: playlists});
});

//Create a playlist to current user
router.post('/session/user', validateBody, requireAuth, async (req, res) => {
    const { user } = req;
    const { name, imageUrl } = req.body;

    const createdPlaylist = await Playlist.create({
        userId: user.id,
        name,
        previewImage: imageUrl
    });
    await createdPlaylist.save();
    return res.json(createdPlaylist);
});

module.exports = router;
