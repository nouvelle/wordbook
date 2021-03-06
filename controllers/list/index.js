const express = require("express");

module.exports = models => {
  /**
   * Controller Logic
   */
  const createVoca = (req, res) => {
    models.list
      .create({
        english: req.body.english,
        japanese: req.body.japanese,
        sentence: req.body.sentence,
        memo: req.body.memo
      })
      .then(voca => res.status(201).json(voca.serialize()))
      .catch(err => {
        if (err.message === "That english word already exists") {
          return res.status(400).json(err.message);
        }

        return res.status(400).send(err.message);
      });
  };

  const listVoca = (req, res) =>
    models.list
      .list()
      .then(vocas => vocas.map(voca => voca.serialize()))
      .then(voca => res.status(200).json(voca))
      .catch(err => res.status(400).send(err.message));

  const deleteVoca = (req, res) =>
    models.list
      .delete({ english: req.body.english })
      .then(voca => res.status(200).json(voca))
      .catch(err => res.status(400).send(err.message));

  const modifyVoca = (req, res) => {
    models.list
      .modify({
        english: req.body.english,
        japanese: req.body.japanese,
        sentence: req.body.sentence,
        memo: req.body.memo
      })
      .then(voca => res.status(204).json(voca))
      .catch(err => res.status(400).send(err.message));
  };
  /**
   * Routes
   */
  const router = express.Router();
  router.post("/", createVoca);
  router.get("/", listVoca);
  router.delete("/", deleteVoca);
  router.patch("/", modifyVoca);
  // router.post("/:id/messages", createUserMessage);

  return router;
};
