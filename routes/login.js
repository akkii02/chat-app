const express = require("express");
const router = express.Router();

router.get("/login",(req, res, next) => {
  res.send(`
        <form action="/login" onsubmit="localStorage.setItem('username',document.getElementById('username').value)" method="POST">
            <input id="username" type="text" name="username" placeholder="Enter username">
            <button type="submit">Add</button>
        </form>
    `);
});
router.post(`/login`,(req, res, next) => {
      res.redirect(`/`)
  })
module.exports = router;
