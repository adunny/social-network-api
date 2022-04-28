const { User, Thought } = require("../models");
const router = require("express").Router();

// get all users
router.get("/", (req, res) => {
  User.find({})
    .select("-__v")
    .then((users) => res.json(users))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get user by id
router.get("/:id", ({ params }, res) => {
  User.findOne({ _id: params.id })
    .select("-__v")
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create user
router.post("/", ({ body }, res) => {
  User.create(body)
    .then((newUser) => res.json(newUser))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update user
router.put("/:id", ({ params, body }, res) => {
  User.findOneAndUpdate({ _id: params.id }, body, {
    new: true,
    runValidators: true,
  })
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).json({ message: "No user found with that id" });
        return;
      }
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete user
router.delete("/:id", ({ params }, res) => {
  User.findOneAndDelete({ _id: params.id })
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).json({ message: "No user found with that id." });
        return;
      }
      // delete the user's thoughts too
      return Thought.deleteMany({ userId: deletedUser._id });
    })
    .then((deletedUser) => res.json(deletedUser))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// add friend
router.post("/:userId/friends/:friendId", ({ params }, res) => {
  User.findOneAndUpdate(
    { _id: params.userId },
    { $push: { friends: params.friendId } },
    { new: true, runValidators: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).json({ message: "No user found with that id" });
        return;
      }
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete friend
router.delete("/:userId/friends/:friendId", ({ params }, res) => {
  User.findOneAndUpdate(
    { _id: params.userId },
    { $pull: { friends: params.friendId } },
    { new: true, runValidators: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).json({ message: "Invalid user id" });
        return;
      }
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
