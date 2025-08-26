module.exports = app => {
    var Login = require('../controller/Login');
    var router = require('express').Router();

    router.post("/", Login.loginUser);
   

    app.use("/loginUser", router);
}