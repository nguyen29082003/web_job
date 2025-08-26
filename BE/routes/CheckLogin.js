module.exports = app => {
    var Login = require('../controller/Login');
    var router = require('express').Router();

    router.get("/", Login.checkLogin);

    app.use("/checkLogin", router);
}