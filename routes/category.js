var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('category.ejs');
});

module.exports = router;