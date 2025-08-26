module.exports = app => {
    var New = require('../controller/New');
    var router = require('express').Router();

    router.post("/", New.create);
    router.get('/', New.findall);
    router.get('/:id', New.findone);
    router.delete('/:id', New.delete);
    router.patch('/:id', New.update);

    app.use("/news", router);
}