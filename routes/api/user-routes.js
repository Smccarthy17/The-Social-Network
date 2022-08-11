const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// set up GET all, POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// set up GET one, PUT, DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// set up POST, DELETE routes for friends at /api/users/:id/friends/:friendId
router 
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;