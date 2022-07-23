const express = require('express');
const app = require('../../app');
const { Song, User, Artist, Album, Comment} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors, handleAddSongToAlbum } = require('../../utils/validation');
const { check } = require('express-validator');

const validateBody = [
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

  const validateParams = [
      check('size')
        .isDecimal()
        .optional()
        .custom((value) => {
            if(value < 0 || value > 20) return false;

            else return true
        })
        .withMessage('Size must be greater than or equal to 0 and less than or equal to 20'),
      check('page')
        .optional()
        .isDecimal()
        .custom((value) => {
            if(value < 0 || value > 10) return false;
            else return true
            })
        .withMessage('Page must be greater than or equal to 0 and less than or equal to 10'),
      check('title')
            .optional()
            .custom( (val) => {
                if(Number.parseInt(val) !== NaN) return false;
                else return true;
            })
            .withMessage('Title must be a string'),
      check('createdAt')
        .custom( (val) => {
            if(Number.parseInt(val) !== NaN) return false;
            else return true;
        })
        .optional()
        .withMessage('createdAt must be a string'),

   handleAddSongToAlbum
  ]


const router = express.Router();

//Edit a song by songId: must be users song
router.put('/:songId', validateBody, requireAuth, async (req, res) => {
    const { user } = req;
    const { songId }= req.params;
    const { title, description, url, imageUrl} = req.body;
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
    }
    if(!(user.id === song.userId)){
        const err = new Error('This aint yers');
        res.status(403)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        });
    };
    if(title){
        song.title = title;
    };
    if(description){
        song.description = description;
    };
    if(url){
        song.url = url;
    };
    if(imageUrl){
        song.imageUrl = imageUrl;
    };

    await song.save();

    return res.json(song);
});

//get all songs by current user
router.get('/session/user', requireAuth, async (req, res) => {
    const { user } = req;
    const userSongs = await Song.findAll({
        where: {userId: user.id }
    });

    const payload = {
        Songs: userSongs
    };

    return res.json(payload);
});

//get comments of a song by song id
router.get('/:songId/comments', async (req, res) => {
    const { songId } = req.params;
    const comments = await Comment.findAll({
        where: {songId},
        include: [
            {
            model: User,
            attributes: ['id', 'username']
            },
        ]
    });

    const song = await Song.findOne({where: {id: songId}})
    if(!song){
        const err = new Error('Song cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    }

    const commentsArray = []
    for(let comment of comments){
        commentsArray.push(comment);
    }

    const payload = {Comments: commentsArray};


    res.json(payload);
});

//Delete a song: requires it to be the users song
router.delete('/:songId', requireAuth, async(req, res) => {
    const { songId } = req.params;
    const { user } = req;
    const song = await Song.findOne({
        where: {id: songId}
    });
    if(!song){
        const err = new Error('Song cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    }
    if(!(user.id === song.userId)){
        const err = new Error('This aint yers');
        return res.json(err.message);
    };

    await song.destroy();
    res.status(200)
    return res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })
});

//get details of a song by id
router.get('/:songId', async (req, res) => {
    const { songId } = req.params;

    const song = await Song.findAll({
        where: {id: songId},
        include: [User, Album]
    });
    if(song.length === 0){
        res.status(404);
        const error = new Error('Song could not be found');
        return res.json({
            message: error.message,
            statusCode: res.statusCode
        })
    }
    let payload = {
        id: song[0].id,
        userId: song[0].userId,
        albumId: song[0].albumId,
        title: song[0].title,
        description: song[0].description,
        url: song[0].url,
        createdAt: song[0].createdAt,
        updatedAt: song[0].updatedAt,
        previewImage: song[0].previewImage,
        Artist: {
            id: song[0].userId,
            username: song[0].User.username,
            previewImage: song[0].User.previewImage,
        },
        Album: {
            id: song[0].Album.id,
            title: song[0].Album.title,
            previewImage: song[0].Album.previewImage
        }
    };
    res.status(200);
    res.json(payload);
 });

//get all songs
router.get('/', validateParams, async (req, res) => {
    //variables for query params other than pagination
    let title = req.query.title;
    let createdAt = req.query.createdAt;
    // Establish base query object to be built up
    let query = {
        where: {}
    };

    // Pagination Options
    // page=XX&size=YY
    const page = req.query.page === undefined ? 0 : parseInt(req.query.page);
    const size = req.query.size === undefined ? 20 : parseInt(req.query.size);


    if (page >= 1 && size >= 1) {
        query.limit = size;
        query.offset = size * (page - 1);
    }

    if(title){
        query.where.title = title;
        const songs = await Song.findAll(query);
        if(songs.length === 0){
            res.status(400);
            const error = Error('No song with that title');
            return res.json({
                statusCode: res.statusCode,
                message: error.message
            });
        }
    }

    if(createdAt){
        query.where.createdAt = createdAt;
        const songs = await Song.findAll(query);
        if(songs.length === 0){
            res.status(400);
            const error = Error('No song created at that point');
            return res.json({
                statusCode: res.statusCode,
                message: error.message
            });
        }
    }





    const songs = await Song.findAll(query);

    const payload = {
        page,
        size ,
        Songs: songs
    }
    res.status(200);
    res.json(payload);
});


module.exports = router;
