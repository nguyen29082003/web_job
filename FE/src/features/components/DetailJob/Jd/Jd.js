import { message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import checkLoginApi from "../../../../api/checkLogin";
import saveWorkApi from "../../../../api/saveWorkApi";
import workApplyApi from "../../../../api/workApplyApi";
import { storage } from "../../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  checkDateDealtime,
  formatDateWork,
} from "../../../container/Functionjs";
import qc from "../../../images/1228.png";
import "../../../scss/DetailJob/Jd.scss";
import KeyTag from "../../Jobs/ListJobs/KeyTag";

export default function Jd(props) {
  let { data, id } = props;
  const [user, setUser] = useState();
  const [load, setLoad] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [notSave, setNotSave] = useState(true);
  const [messager, setMessager] = useState("");
  const [state, setState] = useState({ tenFile: "", file: "" });
  const { tenFile, file } = state;

  useEffect(() => {
    checkLoginApi.checkLogin().then((ok) => {
      if(ok.message==='token loi roi'||ok.message=='UN'){
      }else{
          if (ok.data.user.type === "user") {
          setUser(ok.data.user.id);
        }
        }
      
    });
  }, []);

  useEffect(() => {
    if (!user || !id) return;

    saveWorkApi.getAll({ userId: user, workId: id }).then((data) => {
      const b = data.data.map(item => ({ id: item.id }));
      setDeleteId(b);
      setNotSave(data.data.length === 0);
    });
  }, [user, id, load]);

  const onSaveWork = async () => {
    if (user) {
      await saveWorkApi.postsaveWork([{ userId: user, workId: id }]);
      setLoad(!load);
    } else {
      message.warning("Bạn chưa đăng nhập!");
    }
  };

  const onNotSaveWork = async () => {
    if (user) {
      for (let i = 0; i < deleteId.length; i++) {
        await saveWorkApi.deletesaveWork(deleteId[i].id);
      }
      setLoad(!load);
    } else {
      message.warning("Bạn chưa đăng nhập!");
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = (e) => {
    if (e === "Đã hết hạn") {
      message.warning("Công việc đã hết hạn ứng tuyển!");
    } else {
      if (user) {
        setIsModalVisible(true);
      } else {
        message.warning("Bạn chưa đăng nhập!");
      }
    }
  };

  const hangdelFile = (e) => {
    setState({
      ...state,
      tenFile: e.target.files[0].name,
      file: e.target.files[0],
    });
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    if (messager === "") {
      message.warning("Bạn cần nhập lời nhắn!");
      setConfirmLoading(false);
      return;
    }

    try {
      const storageRef = ref(storage, `fileCv/${file.name}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      await workApplyApi.postworkApply([
        {
          userId: user,
          workId: id,
          message: messager,
          link: downloadURL,
          status: 0,
        },
      ]);

      setIsModalVisible(false);
      setConfirmLoading(false);
      message.success("Ứng tuyển thành công!");
    } catch (error) {
      console.error(error);
      message.error("Tải lên CV thất bại.");
      setConfirmLoading(false);
    }
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="Jd">
      <Modal
        title="Ứng tuyển"
        visible={isModalVisible}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="form-group mb-3">
          <textarea
            className="form-control"
            value={messager}
            onChange={(e) => setMessager(e.target.value)}
            cols="30"
            rows="4"
            placeholder="Lời nhắn"
          ></textarea>
        </div>
        <label htmlFor="file" className="file">File của bạn</label>
        <input type="file" onChange={hangdelFile} hidden id="file" />
        <p>{file ? tenFile : ""}</p>
      </Modal>

      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="job__box">
              <div className="job__box__title"><h4>{data.name}</h4></div>
              <div className="job__box__detail">
                <div className="job__box__detail--address">
                  <i className="fas fa-map-marker-alt"></i> {data.address}
                </div>
                <div className="job__box__detail--fulltime">
                  <i className="fas fa-hourglass-half"></i> {data.nature}
                </div>
                <div className="job__box__detail--status">
                  <i className="fas fa-unlock-alt"></i> {checkDateDealtime(data.dealtime)}
                </div>
                <div className="job__box--detail--salary">
                  <i className="fas fa-dollar-sign"></i> {data.price1} - {data.price2} triệu
                </div>
              </div>
              <div className="apply" onClick={() => showModal(checkDateDealtime(data.dealtime))}>
                <Link>Ứng tuyển ngay</Link>
              </div>
            </div>


            <div className="job__box">
            {/* Lĩnh vực công việc */}
            <div className="job__section">
              <h4><i className="fas fa-briefcase"></i> Lĩnh vực công việc</h4>
              <div className="job__tags">
                {data.TypeOfWorks?.length ? (
                  data.TypeOfWorks.map(type => (
                    <span key={type.id} className="job__tag">
                       {type.name}
                    </span>
                  ))
                ) : (
                  <p>Không có lĩnh vực công việc</p>
                )}
              </div>
            </div>

            {/* Kỹ năng yêu cầu */}
            <div className="job__section">
              <h4><i className="fas fa-code"></i> Kỹ năng yêu cầu</h4>
              <div className="job__tags">
                {data.Tags?.length ? (
                  data.Tags.map(tag => (
                    <span key={tag.id} className="job__tag">
                      <i className="fas fa-tag"></i> {tag.name}
                    </span>
                  ))
                ) : (
                  <p>Không có kỹ năng yêu cầu</p>
                )}
              </div>
            </div>

            {/* Các thông tin khác */}
            <div className="job__section">

              <h4><i className="fas fa-clock"></i> Hình thức làm việc</h4>
              <div className="job__content" dangerouslySetInnerHTML={{ __html: data.nature }} />

              <h4><i className="fas fa-user-graduate"></i> Yêu cầu bằng cấp (tối thiểu)</h4>
              <div className="job__content" dangerouslySetInnerHTML={{ __html: data.request }} />

              <h4><i className="fas fa-briefcase"></i> Yêu cầu kinh nghiệm</h4>
              <div className="job__content" dangerouslySetInnerHTML={{ __html: data.exprience }} />

              <h4><i className="fas fa-tasks"></i> Mô tả công việc</h4>
              <div className="job__content" dangerouslySetInnerHTML={{ __html: data.description }} />

              <h4><i className="fas fa-list-check"></i> Yêu cầu công việc</h4>
              <div className="job__content" dangerouslySetInnerHTML={{ __html: data.form }} />

              <h4><i className="fas fa-gift"></i> Quyền lợi được hưởng</h4>
              <div className="job__content" dangerouslySetInnerHTML={{ __html: data.interest }} />
            </div>
          </div>
          </div>

          <div className="col-md-3">
            <div className="deadline__box">
              <div className="deadline">
                <div className="deadline__icon"><i className="far fa-clock"></i></div>
                <div>
                  <div className="deadline__title">Hạn chót</div>
                  <div className="deadline__time">{formatDateWork(data.dealtime)}</div>
                </div>
              </div>
              <div className="deadline__icon--bot"><i className="far fa-clock"></i></div>
            </div>

            <div className="save__box" onClick={notSave ? onSaveWork : onNotSaveWork}>
              <div className="save__box__title">{notSave ? "Lưu công việc" : "Huỷ lưu công việc"}</div>
            </div>

            <div className="advertisement">
              <img src={qc} alt="" />
            </div>

            {/* <div className="box__keyTag">
              <KeyTag />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
