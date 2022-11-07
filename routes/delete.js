const express = require("express");
const { getUser } = require("../mysql/queries");
const { deleteUser } = require("../mysql/queries");

const router = express.Router();

router.delete("/", async (req, res) => {
  let results = await req.asyncMySQL(getUser(req.headers.token));

  const id = results[0].id;

  if (results.length === 0) {
    res.send({ status: 0, error: "User not found" });
    return;
  }

  results = await req.asyncMySQL(deleteUser(id));

  if (results.affectedRows === 1) {
    res.send({ status: 1 });
  } else {
    res.send({ status: 0, error: "User does not exist" });
  }

  return;
});

module.exports = router;
