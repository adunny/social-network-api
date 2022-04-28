const { User, Thought } = require("../models");
const router = require("express").Router();

// get all users
router.get("/", (req, res) => {
  User.find({})
    .then((users) => res.json(users))
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

// delete user
router.delete("/:id", ({ params }, res) => {
  User.findOneAndDelete({ _id: params.id })
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).json({ message: "No user found with that id." });
        return;
      }
      return Thought.deleteMany({ userId: deletedUser._id });
    })
    .then((deletedUser) => res.json(deletedUser))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
