var TagFormCV = require('../models').TagFormCV;
var FormCV = require('../models').FormCV;
var Tag = require('../models').Tag;
require('dotenv').config()
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
    FormCV.create(req.body, {
        include: {
            model: TagFormCV,
            as: 'tagform'
        }
    }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findall = (req, res) => {
    var page = req.query.page;
    var status = req.query.status;
    page = parseInt(page)
    let soLuongBoQua = (page - 1) * PAGE_SIZE;
    if (page || status) {
        if (page && !status) {
            FormCV.findAndCountAll({ order: [["id", "DESC"]], offset: soLuongBoQua, limit: PAGE_SIZE, include: [Tag] }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        } else if (status && !page) {
            FormCV.findAndCountAll({ where: { status: status }, order: [["id", "DESC"]], include: [Tag] }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        } else {
            FormCV.findAndCountAll({ where: { status: status }, order: [["id", "DESC"]], offset: soLuongBoQua, limit: PAGE_SIZE, include: [Tag] }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        }
    } else {
        FormCV.findAndCountAll({ order: [["id", "DESC"]], include: [Tag] }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    }
}
exports.findone = (req, res) => {
    FormCV.findOne({ where: { id: req.params.id }, include: [Tag] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    FormCV.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    FormCV.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}