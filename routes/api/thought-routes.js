const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

//Get all, Post (create) one thought from /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

//Get one, Put (update) one thought from api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought);

// Delete thought from /api/thoughts/:thoughtId/:userId
router
    .route('/:thoughtId/:userId')
    .delete(deleteThought);

//create reaction at /api/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// remove reaction at /api/:thoughtId/reactions
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);


module.exports = router;