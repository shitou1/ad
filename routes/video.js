var express = require('express');
var router = express.Router();
var Video = require('../models/video');

router.get('/', function (req, res) {
    var video = new Video({title: 'wly', author: 'shitou'});
    video.save(function (err) {
        if (!err) {
            res.render('index.ejs')
        }
    })
});

module.exports = router;