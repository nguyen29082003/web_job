module.exports = app => {
    var FormCV = require('../controller/FormCV');
    var router = require('express').Router();

    router.post("/", FormCV.create);
    router.get('/', FormCV.findall);
    router.get('/:id', FormCV.findone);
    router.delete('/:id', FormCV.delete);
    router.patch('/:id', FormCV.update);

    app.use("/formCVs", router);
}