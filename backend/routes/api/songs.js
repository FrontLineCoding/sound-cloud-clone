const express = require('express');
const app = require('../../app');
const { Song, User, Artist, Album} = require('../../db/models');

const router = express.Router();

//TODO: MAKE END POINTS RESTful


router.get('/:songId', async (req, res) => {
    const { songId } = req.params;

    const song = await Song.findAll({
        where: {id: songId},
        include: [{model:Artist, include: [User]}, Album]
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
            id: song[0].Artist.id,
            username: song[0].Artist.User.username,
            previewImage: song[0].Artist.previewImage,
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


router.get('/', async (req, res) => {
    //variables for query params other than pagination
    let title = req.query.title;
    let createdAt = req.query.createdAt;
    // Establish base query object to be built up
    let query = {
        where: {}
    };

    // Pagination Options
    // page=XX&size=YY
    const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
    const size = req.query.size === undefined ? 3 : parseInt(req.query.size);

    if(size > await Song.count()){
        res.status(400);
        const error = Error(`Largest size can be is: ${await Song.count()}`);
        return res.json({
            statusCode: res.statusCode,
            message: error.message
        });
    }
    if(page > await Song.count() / size){
        res.status(400);
        const error = Error(`Valids pages are 1 - ${Math.ceil(await Song.count() / size)}`);
        return res.json({
            statusCode: res.statusCode,
            message: error.message
        });
    }

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
        songs
    }
    res.status(200);
    res.json(payload);
});


module.exports = router;
