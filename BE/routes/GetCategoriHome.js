module.exports = app => {
    var TypeOfWork = require('../controller/TypeOfWork');
    var router = require('express').Router();

    router.get('/', TypeOfWork.findCategori);


    app.use("/getCategori", router);
}