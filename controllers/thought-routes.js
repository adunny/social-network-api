const router = require("express").Router();
const { User, Thought } = require("../models");

// get all thoughts
router.get("/", (req, res) => {
  Thought.find({})
    .then((thoughts) => res.json(thoughts))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create thought
router.post("/", ({ body }, res) => {
  Thought.create(body)
    .then(({ userId, _id }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then((newThought) => {
      if (!newThought) {
        res.status(404).json({ message: "That user doesn't exist!" });
        return;
      }
      res.json(newThought);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
