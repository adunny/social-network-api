const router = require("express").Router();
const { User, Thought } = require("../models");

// get all thoughts
router.get("/", (req, res) => {
  Thought.find({})
    .select("-__v")
    .then((thoughts) => res.json(thoughts))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get thought by id
router.get("/:id", ({ params }, res) => {
  Thought.findOne({ _id: params.id })
    .select("-__v")
    .then((thought) => res.json(thought))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create thought
router.post("/", ({ body }, res) => {
  Thought.create(body)
    .then(({ userId, _id }) => {
      // push newly created thought into user's thought array
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

// update thought
router.put("/:id", ({ params, body }, res) => {
  Thought.findOneAndUpdate({ _id: params.id }, body, {
    new: true,
    runValidators: true,
  })
    .then((updatedThought) => {
      if (!updatedThought) {
        res.status(404).json({ message: "invalid id" });
        return;
      }
      res.json(updatedThought);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete thought
router.delete("/:id", ({ params }, res) => {
  Thought.findOneAndDelete({ _id: params.id })
    .then((deletedThought) => {
      if (!deletedThought) {
        res.status(404).json({ message: "invalid id" });
        return;
      }
      res.json(deletedThought);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// add reaction
router.post("/:thoughtId/reactions", ({ params, body }, res) => {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $push: { reactions: body } },
    { new: true, runValidators: true }
  )
    .then((reaction) => {
      if (!reaction) {
        res.status(404).json({ message: "invalid id" });
        return;
      }
      res.json(reaction);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete reaction
router.delete("/:thoughtId/reactions/:reactionId", ({ params }, res) => {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { reactionId: params.reactionId } } },
    { new: true, runValidators: true }
  )
    .then((updatedThought) => {
      res.json(updatedThought);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});

module.exports = router;
