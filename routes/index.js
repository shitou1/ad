module.exports = function (app) {
  // 路由到video
  app.use('/video', require('./video'))
};