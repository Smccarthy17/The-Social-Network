const { User, Thought } = require('../public/models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find().populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // get user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Error: user not found' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Error: user not found' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err))
    },

    // delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'Error: user not found' });
                };
                res.json(dbUserData);
                // todo: delete all associated thoughts
            })
            .catch(err => res.json(err));
    },

    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'Error: user not found' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));

    },

    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'Error: user not found' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));

    },
};

module.exports = userController;