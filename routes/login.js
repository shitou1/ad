var express = require('express');
var Geetest = require('gt3-sdk/gt-sdk');
var router = express.Router();

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
                info: '登录失败'
            });
        } else {

            res.send({
                status: "success",
                info: '登录成功'
            });
        }
    });
});

router.get('/', function (req, res) {
    res.render('login.ejs');
});

module.exports = router;