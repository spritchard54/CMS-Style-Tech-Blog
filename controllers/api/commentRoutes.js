const router = require('express').Router();
const {Comment} = require('../../models');
 

router.get("/comments", async (req, res) => {
    res.render("homepage");
  });


module.exports = router;