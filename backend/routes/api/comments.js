const express = require('express');
const app = require('../../app');
const { Song, User, Artist, Album, Comment} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors, handleAddSongToAlbum } = require('../../utils/validation');
const { check } = require('express-validator');

const validateCommentBody = [
    check('body')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Comment body text is required'),

     handleValidationErrors
  ];


const router = express.Router();

//create a comment for a song by songId
router.post('/songs/:songId', validateCommentBody, requireAuth, async (req, res) => {
    const { user } = req;
    const { songId } = req.params;
    const { body } = req.body;
    const song = await Song.findByPk(songId);
    if(!song){
        const err = new Error('Song cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    }

    const comment = await Comment.create({
        userId: user.id,
        songId: parseInt(songId),
        body
    });

    await comment.save();
    return res.json(comment);
});

//Edit a comment - must belong to current user
router.put('/:commentId', validateCommentBody, requireAuth, async (req,res) => {
    const { user } = req;
    const { commentId } = req.params;
    const { body } = req.body;
    const comment = await Comment.findByPk(commentId);
    if(!comment){
        const err = new Error('Comment cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    }

    if(!(comment.userId === user.id)){
        const err = new Error('This aint yers');
        res.status(403)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
     });
    }

    comment.body = body;
    await comment.save();
    return res.json(comment);
});

//Delete a comment - must belong to current user
router.delete('/:commentId', requireAuth, async (req, res) => {
    const { user } = req;
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);
    if(!comment){
        const err = new Error('Comment cannot be found');
        res.status(404)
        return res.json({
            message: err.message,
            statusCode: res.statusCode
        })
    }

    if(!(comment.userId === user.id)){
        const err = new Error('This aint yers');
        return res.json(err.message);
    }

    await comment.destroy();
    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    });
});

module.exports = router;
