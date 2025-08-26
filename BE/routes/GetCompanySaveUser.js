module.exports = app => {
    var Company = require('../controller/Company');
    var router = require('express').Router();

    router.get('/:id', Company.findCompanySaveUser);


    app.use("/getCompanySaveUser", router);
}