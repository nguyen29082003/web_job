module.exports = app => {
    var SaveWork = require('../controller/SaveWork');
    var router = require('express').Router();

    router.delete("/:id", SaveWork.delete);


    app.use("/deleteSaveWorks", router);
}