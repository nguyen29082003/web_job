var Work = require('../models').Work;
var Company = require('../models').Company;
var Tag = require('../models').Tag;
var TypeOfWork = require('../models').TypeOfWork;
var TagWork = require('../models').TagWork;
var WorkTypeOfWork = require('../models').WorkTypeOfWork;
require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let PAGE_SIZE = parseInt(process.env.PAGE_SIZE)||10;
exports.create = (req, res) => {
  Work.create(req.body, {
    include: ['tagWork', 'workType'],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findall = (req, res) => {
  var page = req.query.page;
  var status = req.query.status;
  var name = req.query.name;
  var pageSize = req.query.pageSize;
  var typeWordId = req.query.typeWordId || '';
  console.log('typeWordId', typeWordId);
  let PA_SI = parseInt(pageSize) || PAGE_SIZE;

  page = parseInt(page);
  let soLuongBoQua = (page - 1) * PA_SI;
  if (name) {
    Work.findAndCountAll({
      order: [['id', 'DESC']],
      include: [
        { model: Company, where: { name: { [Op.like]: `%${name}%` } } },
      ],
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  } else {
    if (page || status) {
      if (page && !status) {
        Work.findAndCountAll({
          order: [['id', 'DESC']],
          offset: soLuongBoQua,
          limit: PA_SI,
          include: [Company],
        })
          .then((data) => {
            res.json({ data: data });
          })
          .catch((er) => {
            throw er;
          });
      } else if (status && !page) {
        Work.findAndCountAll({
          where: { status: status },
          order: [['id', 'DESC']],
          include: [Company],
          subQuery: false,
        })
          .then((data) => {
            res.json({ data: data });
          })
          .catch((er) => {
            throw er;
          });
      } else {
        Work.findAndCountAll({
          where: { status: status },
          order: [['id', 'DESC']],
          offset: soLuongBoQua,
          include: [
            Company,
            {
              model: TypeOfWork,
              where: { id: { [Op.like]: `%${typeWordId}%` } },
            },
          ],
          limit: PA_SI,
          subQuery: false,
        })
          .then((data) => {
            res.json({ data: data });
          })
          .catch((er) => {
            res.json({ data: er });
          });
      }
    } else {
      Work.findAndCountAll({ order: [['id', 'DESC']], include: [Company] })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    }
  }
};

const checkSalary = (data, type = 0) => {
  if (type == 1) {
    // <= 5
    return data.filter((x) => x.price1 <= 5);
  } else if (type == 2) {
    // 5-10
    return data.filter(
      (x) =>
        (x.price1 >= 5 && x.price1 <= 10) || (x.price2 >= 5 && x.price2 <= 10),
    );
  } else if (type == 3) {
    // 10-15
    return data.filter(
      (x) =>
        (x.price1 >= 10 && x.price1 <= 15) ||
        (x.price2 >= 10 && x.price2 <= 15),
    );
  } else if (type == 4) {
    // > 15
    return data.filter((x) => x.price1 > 15 || x.price2 > 15);
  } else {
    return data;
  }
};

const checkExprience = (data, type = 0) => {
  if (type == 0) {
    return data;
  } else if (type == 1) {
    return data.filter((x) =>
      x.exprience?.toLocaleLowerCase().includes('không'),
    );
  } else if (type == 2) {
    return data.filter((x) =>
      ['1 ', '2 ', '3 '].some((y) => x.exprience?.includes(y)),
    );
  } else if (type == 3) {
    return data.filter((x) =>
      ['3 ', '4 ', '5 '].some((y) => x.exprience?.includes(y)),
    );
  } else if (type == 4) {
    return data.filter((x) =>
      ['5 ', '6 ', '7 ', '8 ', '9 ', '10 '].some((y) =>
        x.exprience?.includes(y),
      ),
    );
  } else if (type == 5) {
    return data.filter((x) =>
      ['11 ', '12 ', '13 ', '14'].some((y) =>
        x.exprience?.includes(y),
      ),
    );
  } else {
    return data;
  }
};


exports.search = async (req, res) => {
  try {
    const address = req.query.address || '';
    const status = req.query.status || '1';
    const name = req.query.name || '';
    const typeWordId = req.query.typeWordId || '0';
    const nature = req.query.nature === '0' ? '' : req.query.nature;
    const salary = req.query.salary||'0';
    const exp = req.query.exp||'0';

    // Phân trang
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Include
    const include = [
      { model: Company, attributes: ['name', 'id', 'avatar'] },
    ];

    if (typeWordId !== '0') {
      include.push({
        model: TypeOfWork,
        where: { id: typeWordId }
      });
    } else {
      include.push({ model: TypeOfWork });
    }

    // Lấy toàn bộ data thỏa SQL
    const result = await Work.findAll({
      where: {
        nature: { [Op.like]: `%${nature}%` },
        address: { [Op.like]: `%${address}%` },
        name: { [Op.like]: `%${name}%` },
        status: status,
      },
      order: [['id', 'DESC']],
      attributes: [
        'id',
        'name',
        'address',
        'createdAt',
        'price1',
        'price2',
        'dealtime',
        'exprience',
      ],
      include,
    });

    // Lọc tiếp bằng JS
    let filtered = checkExprience(checkSalary(result, salary), exp);
    const count = filtered.length;

    // Phân trang sau lọc
    const paginated = filtered.slice(offset, offset + limit);

    return res.json({
      data: {
        count,
        rows: paginated,
      },
    });
  } catch (er) {
    console.error(er);
    return res.status(500).json({ error: 'Lỗi khi tìm kiếm công việc' });
  }
};



exports.findAllId = (req, res) => {
  var page = req.query.page;
  var companyId = req.query.id;
  if (page) {
    page = parseInt(page);
    let soLuongBoQua = (page - 1) * PAGE_SIZE;
    Work.findAndCountAll({
      offset: soLuongBoQua,
      limit: PAGE_SIZE,
      include: [Company],
      where: { companyId: companyId, status: 1 },
      order: [['id', 'ASC']],
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  } else {
    Work.findAndCountAll({
      include: [Company],
      where: { companyId: companyId, status: 1 },
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};

exports.findone = (req, res) => {
  Work.findOne({
    where: { id: req.params.id },
    include: [Company, TypeOfWork, Tag],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};

exports.delete = (req, res) => {
  Work.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};

exports.update = (req, res) => {
  Work.update(req.body, {
    where: { id: req.params.id },
    include: ['tagWork', 'workType'],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const {
    tagIds,            // Mảng tagId mới để gán
    typeOfWorkIds,     // Mảng typeOfWorkId mới để gán
    ...workData        // Dữ liệu cập nhật cho bảng chính
  } = req.body;

  try {
    // 1. Cập nhật công việc chính
    const [updated] = await Work.update(workData, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy công việc để cập nhật' });
    }

    // 2. Cập nhật tagWork (nếu có)
    if (Array.isArray(tagIds)) {
      await TagWork.destroy({ where: { workId: id } }); // Xóa tag cũ
      const newTags = tagIds.map(tagId => ({ tagId, workId: id }));
      await TagWork.bulkCreate(newTags);
    }

    // 3. Cập nhật workType (nếu có)
    if (Array.isArray(typeOfWorkIds)) {
      await WorkTypeOfWork.destroy({ where: { workId: id } }); // Xóa loại công việc cũ
      const newTypes = typeOfWorkIds.map(typeId => ({ typeofworkId: typeId, workId: id }));
      await WorkTypeOfWork.bulkCreate(newTypes);
    }

    res.json({ message: 'Cập nhật thành công' });
  } catch (error) {
    console.error('Lỗi khi cập nhật công việc:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

