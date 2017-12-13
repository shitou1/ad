module.exports = function (app) {
    // 路由到video
    app.use('/video', require('./video'));

    // GET / 首页
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    // GET /disclaimer 声明页
    app.get('/disclaimer', function (req, res) {
        res.render('disclaimer.ejs');
    });

    // All /category 分类
    app.use('/category', require('./category'));

    // All /inventory 我的清单
    app.use('/inventory', require('./inventory'));

    // All /login 登录
    app.use('/login', require('./login'));
};