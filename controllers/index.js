const express = require("express");

const router = express.Router();

const userRouter = require("./list");
// const channelRouter = require("./channel");

module.exports = models => {
  router.use("/list", userRouter(models));
  // router.use("/channels", channelRouter(models));

  return router;
};
