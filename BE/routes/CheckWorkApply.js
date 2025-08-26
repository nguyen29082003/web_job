module.exports = app => {
    var WorkApply = require('../controller/WorkApply');
    var router = require('express').Router();

    router.get('/:id', WorkApply.checkWorkApply);

    app.use("/checkWorkApply", router);
}