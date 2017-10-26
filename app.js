var express = require('express');
var app = express();
var router = require('./routes/index');
var mongoose = require('mongoose');

// 数据库配置
mongoose.connect('mongodb://localhost/ad', { useMongoClient: true });
mongoose.Promise = global.Promise;

// 静态文件托管
app.use(express.static('public'));

// 设置模板目录
app.set('views', 'public/views');

// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

// 路由
router(app);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});