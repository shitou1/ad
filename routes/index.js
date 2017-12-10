module.exports = function (app) {
    // 路由到video
    app.use('/video', require('./video'));

    // 路由到index
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    // 路由到disclaimer
    app.get('/disclaimer', function (req, res) {
        res.render('disclaimer.ejs');
    });

    // 路由到classify
    app.use('/category', require('./category'));


};