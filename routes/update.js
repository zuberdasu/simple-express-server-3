const express = require("express");
const { getUser } = require("../mysql/queries");
const { updateUser } = require("../mysql/queries");

const router = express.Router();

router.put("/", async (req, res) => {
  let results = await req.asyncMySQL(getUser(req.headers.token));

  const id = results[0].id;

  if (results.length === 0) {
    res.send({ status: 0, error: "User not found" });
    return;
  }

  const { body } = req;

  if (body.name && body.email && body.password) {
    results = await req.asyncMySQL(
      updateUser(id, body.name, body.email, body.password)
    );

    if (results.affectedRows === 1) {
      res.send({ status: 1 });
    } else {
      res.send({ status: 0, error: "User does not exist" });
    }
  } else {
    res.send({ status: 0, error: "Update data missing" });
  }
});

module.exports = router;
