module.exports = app => {
    var Candidate = require('../controller/Candidate');
    var router = require('express').Router();

    router.post("/", Candidate.create);
    router.get('/', Candidate.findall);
    router.get('/:id', Candidate.findone);
    router.delete('/:id', Candidate.delete);
    router.patch('/:id', Candidate.update);

    app.use("/candidates", router);
}