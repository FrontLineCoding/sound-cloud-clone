const express = require('express');
const app = require('../../app');
const { Song } = require('../../db/models');

const router = express.Router();



router.get('/', async (req, res) => {
    //variables for query params other than pagination
    let title = req.query.title;
    let createdAt = req.query.createdAt;
    // Establish base query object to be built up
    let query = {
        where: {},
        include: []
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
    res.json(payload);
});


module.exports = router;
