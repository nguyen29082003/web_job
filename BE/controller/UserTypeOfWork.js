var UserTypeOfWork = require('../models').UserTypeOfWork;
require('dotenv').config()
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
    UserTypeOfWork.bulkCreate(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findall = (req, res) => {
    var page = req.query.page;
    if (page) {
        page = parseInt(page)
        let soLuongBoQua = (page - 1) * PAGE_SIZE;
        UserTypeOfWork.findAndCountAll({ order: [["id", "DESC"]], offset: soLuongBoQua, limit: PAGE_SIZE }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    } else {
        UserTypeOfWork.findAndCountAll({ order: [["id", "DESC"]] }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    }
}
exports.findone = (req, res) => {
    UserTypeOfWork.findOne({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    UserTypeOfWork.destroy({ where: { userId: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    UserTypeOfWork.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}