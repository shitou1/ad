var express = require('express');
var app = express();
var router = require('./routes/index');

// 静态文件托管
app.use(express.static('public'));

// 路由
router(app);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});