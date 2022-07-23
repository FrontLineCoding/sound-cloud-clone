const express = require('express');
const app = require('../../app');
const { Song, User, Artist, Album} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors, handleAddSongToAlbum } = require('../../utils/validation');
const { check } = require('express-validator');

const validateBodyAddSong = [
    check('title')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Song title is required'),
    check('url')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Audio is required'),

     handleAddSongToAlbum
  ];

  const validateBodyCreateAlbum = [
    check('title')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Album title is required'),

     handleAddSongToAlbum
  ];

  const validateBodyEditAlbum = [
    check('title')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Album title is required'),

     handleAddSongToAlbum
  ];

const router = express.Router();


//get all albums by the current user
router.get('/session/user', async (req,res) => {
    const { user } = req;
    const albumsByUser = await Album.findAll({
        where: { userId: user.id}
    });

    return res.json({Albums: albumsByUser});
});


//create a song in an album by an album id
router.post('/:albumId/songs', validateBodyAddSong, requireAuth, async (req, res) => {
    const { albumId } = req.params;
    const { user } = req;
    const album = await Album.findOne({
        where: {id: albumId},
        include: [User]
    });
    if(!album){
        const err = new Error('Album cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    }
    if(!(user.id === album.userId)){
        const err = new Error('This aint yers');
        res.status(403);
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        });
    };

    const { title, description, url, imageUrl } = req.body;
    const song = await Song.create({
        userId: user.id,
        albumId: parseInt(albumId),
        title,
        description,
        url,
        previewImage: imageUrl,
    });

    res.status(201)
    return res.json(song);
});

//Delete an album
router.delete('/:albumId', requireAuth, async (req, res) => {
    const { user } = req;
    const { albumId } = req.params;
    const album = await Album.findByPk(albumId);
    if(!album){
        const err = new Error('Album cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    }
    if(!(album.userId === user.id)){
        const err = new Error('This aint yers');
        res.status(403)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        });
    };

    album.destroy()
    res.status(200)
    return res.json({message: 'successfully deleted', statusCode: res.statusCode});
});

//Edit an album by albumId - must belong to current user
router.put('/:albumId', validateBodyEditAlbum, requireAuth, async (req, res) => {
    const { user } = req;
    const {albumId} = req.params;
    const {title, description, imageUrl} = req.body;
    const album = await Album.findOne({where: {id: albumId}});
    if(!album){
        const err = new Error('Album cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    }
    if(!(album.userId === user.id)){
        const err = new Error('This aint yers');
        res.status(403)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        });
    };

    album.title = title;
    album.description = description;
    album.previewImage = imageUrl
    album.save();

    return res.json(album);
});

//get an album by an id
router.get('/:albumId', async (req, res) => {
    const { albumId } = req.params;


    const albums = await Album.findAll({
        where: {id: albumId},
        include: [User]
    });
    if(albums.length === 0){
        res.status(404);
        const error = new Error('Album could not be found');
        return res.json({
            message: error.message,
            statusCode: res.statusCode
        })
    }
    const songs = await Song.findAll({
        where: {albumId}
    });

    const payload = {
        id: albums[0].id,
        userId: albums[0].userId,
        title: albums[0].title,
        description: albums[0].description,
        createdAt: albums[0].createdAt,
        updatedAt: albums[0].updatedAt,
        previewImage: albums[0].previewImage,
        Artist: {
          id: albums[0].userId ,
          username: albums[0].User.username,
          previewImage: albums[0].User.previewImage
        },
        Songs: songs
    }

    res.json(payload)
})

//create an album
router.post('/', validateBodyCreateAlbum, requireAuth, async (req, res) => {
    const { user } = req;
    const {title, description, imageUrl } = req.body;
    const createdAlbum = await Album.create({
        userId: parseInt(user.id),
        title,
        description,
        previewImage: imageUrl
    });

    return res.json(createdAlbum)
});

//get all albums
router.get('/', async (req, res) => {
    const albums = await Album.findAll({});

    const albumsArray = [];

    res.status(200);
    return res.json({Albums: albums});
});


module.exports = router;
