const express = require('express');
const app = require('../../app');
const { Song, User, Artist, Album, Comment} = require('../../db/models');

const router = express.Router();

router.get('/:artistId', async (req, res) => {
    const { artistId } = req.params;

    const artist = await Artist.findAll({
        where: {id: artistId},
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    });

    if(artist.length === 0){
        res.status(404);
        const error = new Error('Artist could not be found');
        return res.json({
            message: error.message,
            statusCode: res.statusCode
        })
    }

    const payload = {
        id: artist[0].id,
        username:artist[0].User.username,
        totalSongs:artist[0].totalSongs,
        totalAlbums:artist[0].totalAlbums,
        previewImage:artist[0].previewImage
    }

    res.json(payload);
});



module.exports = router;
