const express = require('express');
const app = require('../../app');
const { Song, User, Artist, Album, Comment} = require('../../db/models');

const router = express.Router();


router.get('/:songId', async (req, res) => {
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

    const songs = await Song.findAll({where: {id: songId}})
    if(songs.length === 0){
        res.status(404);
        const error = new Error('Song could not be found');
        return res.json({
            message: error.message,
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

module.exports = router;
