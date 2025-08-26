module.exports = app => {
    var TypeOfWork = require('../controller/TypeOfWork');
    var router = require('express').Router();

    router.post("/", TypeOfWork.create);
    router.get('/', TypeOfWork.findall);
    router.get('/:id', TypeOfWork.findone);
    router.delete('/:id', TypeOfWork.delete);
    router.patch('/:id', TypeOfWork.update);

    app.use("/typeWorks", router);
}