module.exports = app => {
    var User = require('../controller/User');
    var router = require('express').Router();

    router.get('/:id', User.findSaveWork);


    app.use("/getUserSaveWork", router);
}