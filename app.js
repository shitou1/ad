var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./routes/index');
var mongoose = require('mongoose');
var session = require('express-session');


增加一行dededeFFFFF修改
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true
}));

// 数据库配置
mongoose.connect('mongodb://localhost/ad', { useMongoClient: true });
mongoose.Promise = global.Promise;

// 静态文件托管
app.use(express.static('public'));

// 设置模板目录
app.set('views', 'views');

// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

// 路由
router(app);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

cherry-pick 修改app.js