var User = require('../models').User;
var Company = require('../models').Company;
var Role = require("../models").Role;
var Work = require("../models").Work;
var TypeOfWork = require("../models").TypeOfWork
var Tag = require("../models").Tag
var UserRole =require("../models").UserRole;
require('dotenv').config()
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
    const mail = req.body.email;
    User.findAll({ where: { email: mail } }).then(data => {
        if (data.length !== 0) {
            res.json({ data: "email đã tồn tại!" })
        } else {
            Company.findAll({ where: { email: mail } }).then(data => {
                if (data.length !== 0) {
                    res.json({ data: "email đã tồn tại!" })
                } else {
                    User.create(req.body,{ include:{model:UserRole, as:"asUserRole"}} ).then(data => {
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
    var page1 = req.query.page;
    var status = req.query.status;
    let page = parseInt(page1)
    let soLuongBoQua = (page - 1) * PAGE_SIZE;
    if (page || status) {
        if (page && !status) {
            User.findAndCountAll({ offset: soLuongBoQua, limit: PAGE_SIZE, include: [{ model: TypeOfWork }, { model: Tag },{model:Role}] }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        } else if (status && !page) {

            User.findAndCountAll({ where: { status: status }, include: [{ model: TypeOfWork }, { model: Tag },{model:Role}] }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        } else {

            User.findAndCountAll({ where: { status: status }, offset: soLuongBoQua, limit: PAGE_SIZE, include: [{ model: TypeOfWork }, { model: Tag },{model:Role}] }).then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
        }
    } else {

        User.findAndCountAll({ include: [{ model: TypeOfWork }, { model: Tag },{model:Role}] }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    }
}
exports.findone = (req, res) => {
    User.findOne({ where: { id: req.params.id }, include: [{ model: TypeOfWork }, { model: Tag }] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}

exports.findSaveWork = (req, res) => {
    User.findOne({ where: { id: req.params.id }, include: [{ model: TypeOfWork }, { model: Tag }, { model: Work, attributes: ['id', 'name', 'companyId', 'address', 'dealtime', 'price1', 'price2'], include: [{ model: Company, attributes: ['name', 'avatar'] }] }] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    User.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      name, email, password, address, phone, male,
      avatar, date, status, banner, introduce, tags
    } = req.body;

    // Kiểm tra user tồn tại
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cập nhật thông tin người dùng
    await user.update({
      name, email, password, address, phone, male,
      avatar, date, status, banner, introduce
    });

    // Cập nhật tags nếu có (tags là mảng tagId)
    if (Array.isArray(tags)) {
      await user.setTags(tags); // Sequelize sẽ xử lý bảng trung gian UserTags
    }

    // Lấy lại user + tags
    const updatedUser = await User.findByPk(userId, {
      include: [Tag]
    });

    res.json({
      message: "User updated successfully",
      data: updatedUser
    });

  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};