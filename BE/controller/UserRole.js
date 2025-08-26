var UserRole = require('../models').UserRole;
require('dotenv').config()
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
    UserRole.create(req.body).then(data => {
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
            UserRole.findAndCountAll({ order: [["id", "DESC"]], offset: soLuongBoQua, limit: PAGE_SIZE }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        } else if (status && !page) {
            UserRole.findAndCountAll({ where: { status: status }, order: [["id", "DESC"]] }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        } else {
            UserRole.findAndCountAll({ where: { status: status }, order: [["id", "DESC"]], offset: soLuongBoQua, limit: PAGE_SIZE }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        }
    } else {
        UserRole.findAndCountAll({ order: [["id", "DESC"]] }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    }
}
exports.findone = (req, res) => {
    UserRole.findOne({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    UserRole.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    console.log(req.body,req.params.id);
    UserRole.update(req.body, { where: { userId: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}