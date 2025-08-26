var Company = require('../models').Company;
var User = require("../models").User;
var Work = require("../models").Work;
require('dotenv').config()
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
    const mail = req.body.email;
    Company.findAll({ where: { email: mail } }).then(data => {
        if (data.length !== 0) {
            res.json({ data: "email đã tồn tại!" })
        } else {
            User.findAll({ where: { email: mail } }).then(data => {
                if (data.length !== 0) {
                    res.json({ data: "email đã tồn tại!" })
                } else {
                    Company.create(req.body).then(data => {
                        res.json({ data: data })
                    }).catch(er => {
                        throw er;
                    })
                }
            })
        }
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
            Company.findAndCountAll({ offset: soLuongBoQua, limit: PAGE_SIZE }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        } else if (status && !page) {
            Company.findAndCountAll({ where: { status: status } }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        } else {
            page = parseInt(page)
            let soLuongBoQua = (page - 1) * PAGE_SIZE;
            Company.findAndCountAll({ where: { status: status }, offset: soLuongBoQua, limit: PAGE_SIZE }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        }
    } else {
        Company.findAndCountAll().then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    }
}
exports.checkAll = (req, res) => {
    var page = req.query.page;
    if (page) {
        page = parseInt(page)
        let soLuongBoQua = (page - 1) * PAGE_SIZE;
        Company.findAndCountAll({ where: { status: 0 }, offset: soLuongBoQua, limit: PAGE_SIZE }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    } else {
        Company.findAndCountAll({ where: { status: 0 } }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    }
}
exports.findone = (req, res) => {
    Company.findOne({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findCompanySaveUser = (req, res) => {
    Company.findOne({ where: { id: req.params.id }, include: [{ model: Work, attributes: ["name", "id"], include: [{ model: User, attributes: ['id', 'avatar', 'name', 'address', 'phone', 'male', 'email'] }] }], attributes: ['name', 'avatar'] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    Company.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    Company.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}