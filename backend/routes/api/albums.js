const express = require('express');
const app = require('../../app');
const { Song, User, Artist, Album} = require('../../db/models');

const router = express.Router();


router.get('/:albumId', async (req, res) => {
    const { albumId } = req.params;


    const albums = await Album.findAll({
        where: {id: albumId},
        include: [{model: Artist, include: [User]}]
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
        userId: albums[0].Artist.userId,
        title: albums[0].title,
        description: albums[0].description,
        createdAt: albums[0].createdAt,
        updatedAt: albums[0].updatedAt,
        previewImage: albums[0].previewImage,
        Artist: {
          id: albums[0].Artist.id ,
          username: albums[0].Artist.User.username,
          previewImage: albums[0].Artist.previewImage
        },
        Songs: songs
    }

    // res.json({albums, songs});
    res.json(payload)
    // res.json(albums)
})


router.get('/', async (req, res) => {
    const albums = await Album.findAll({
        include: [{model: Artist, include: [User]}]
    });

    const albumsArray = [];

    for (let album of albums){
        const pushMeToAlbumsArray = {
        id: album.id,
        userId: album.Artist.userId,
        title: album.title,
        description: album.description,
        createdAt: album.createdAt,
        updatedAt: album.updatedAt,
        previewImage: album.previewImage
        }
        albumsArray.push(pushMeToAlbumsArray);
    }

    const payload = {
        Albums: albumsArray
    }
    res.status(200);
    res.json(payload);
    // res.json(albums[0].Artist.userId);
});


module.exports = router;
