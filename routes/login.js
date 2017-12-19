var express = require('express');
var Geetest = require('gt3-sdk/gt-sdk');
var router = express.Router();
var sha1 = require('sha1');
var User = require('../models/user');

// 验证码初始化
var captcha = new Geetest({
    geetest_id: 'd7913e838b8e5ce6f02240178400d518',
    geetest_key: 'b823d1ac6e0b9bd26d637eeb3cf7a7a7'
});

router.get("/gt/register-click", function (req, res) {

    // 向极验申请每次验证所需的challenge
    captcha.register(null, function (err, data) {
        if (err) {
            console.error(err);
            res.status(500);
            res.send(err);
            return;
        }

        if (!data.success) {
            req.session.fallback = true;
            res.send(data);
        } else {
            req.session.fallback = false;
            res.send(data);
        }
    });
});
router.post("/gt/validate-click", function (req, res) {
    // 对ajax提供的验证凭证进行二次验证
    captcha.validate(req.session.fallback, {
        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode
    }, function (err, success) {

        if (err) {
            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (!success) {

            // 二次验证失败
            res.send({
                status: "fail",
                info: '注册失败'
            });
        } else {
            // 验证用户名是否重复
            User.findOne({'username': req.body.username}, function (err, user) {
                var responseData = {};

                if (err) {
                    responseData = {
                        status: "fail",
                        info: err
                    };
                    return res.send(responseData);
                }
                if (user) {
                    responseData = {
                        status: "fail",
                        info: '用户名已存在'
                    };
                    return res.send(responseData);
                } else {
                    var user = new User({
                        username:  req.body.username,
                        password: sha1(req.body.password),
                        email: req.body.email
                    });
                    user.save(function (err) {
                        if (err) {
                            responseData = {
                                status: "fail",
                                info: err
                            };
                        } else {
                            responseData = {
                                status: "success",
                                info: '注册成功'
                            };
                            req.session.user = req.body.username;
                        }
                        return res.send(responseData);
                    });
                }
            });
        }
    });
});

router.get('/', function (req, res) {
    res.render('login.ejs');
});

module.exports = router;