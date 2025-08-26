var New = require('../models').New;
var TagNew = require('../models').TagNew;
var Tag = require("../models").Tag;
require('dotenv').config()
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
    New.create(req.body, {
        include: {
            model: TagNew,
            as: 'tagnew'
        }
    }).then(data => {
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
        New.findAndCountAll({ order: [["id", "DESC"]], offset: soLuongBoQua, limit: PAGE_SIZE }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    } else {
        New.findAndCountAll({ order: [["id", "DESC"]] }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    }
}
exports.findone = (req, res) => {
    New.findOne({ where: { id: req.params.id }, include: [Tag] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Kiểm tra xem bản ghi có tồn tại không
        const newsItem = await New.findOne({ where: { id } });
        if (!newsItem) {
            return res.status(404).json({ message: "Không tìm thấy bản ghi cần xóa." });
        }

        // Tiến hành xóa
        await New.destroy({ where: { id } });
        return res.json({ message: "Xóa thành công!" });

    } catch (error) {
        console.error("Lỗi khi xóa:", error);
        return res.status(500).json({ message: "Lỗi server khi xóa dữ liệu.", error });
    }
};

exports.update = (req, res) => {
    New.update(req.body, {
        where: { id: req.params.id },
        include: {
            model: TagNew,
            as: 'tagnew'
        }
    }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}