module.exports = app => {
    var WorkApply = require('../controller/WorkApply');
    var router = require('express').Router();

    router.get('/:id', WorkApply.checkUserApply);

    app.use("/checkUserApply", router);
}
