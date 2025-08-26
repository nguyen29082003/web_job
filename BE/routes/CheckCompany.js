module.exports = app => {
    var Company = require('../controller/Company');
    var router = require('express').Router();

    router.get('/', Company.checkAll);

    app.use("/checkCompanys", router);
}