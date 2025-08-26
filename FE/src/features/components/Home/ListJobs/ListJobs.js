import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../../../scss/Home/ListJobs.scss"
import logo from "../../../images/logoNew2.png"
import { useDispatch, useSelector } from 'react-redux';
import { workData } from '../../../admin/Slice/workSlice';
import SpinLoad from '../../Spin/Spin';
import { formatDateWork } from '../../../container/Functionjs';
export default function ListJobs() {
    const work = useSelector(state => state.works.work.data);
    const loading = useSelector(state => state.works.loading)
    const dispatch = useDispatch();
    const actionResult = async (page) => { await dispatch(workData(page)) }
    useEffect(() => {
        actionResult({ page: 1, status: 1 });
    }, [])
    return (
        <div className="ListJob">
            <div className="heading">
                <div className="heading__title">
                    <h3><Link to="/jobs">Công việc</Link> mới nhất</h3>
                </div>
                <div className="heading__hr"></div>
            </div>
            <div className="container">
                <div className="row">
                    {loading ? <SpinLoad /> :
                        work.rows.map(ok => (
                            <div className="col-lg-6" key={ok.id}>
                                <div className="job__box">
                                    <div className="job__tag">New</div>
                                    <div className="job__logo">
                                        <img src={ok.Company.avatar} alt="" />
                                    </div>
                                    <div className="job__content">
                                        <div className="job__title">
                                            <Link to="/jobs/work/1"><h4 className="jobTitle">{ok.name}</h4></Link>
                                        </div>
                                        <div className="job__nameCompany">
                                            <Link to="/jobs/work/1"><span>{ok.Company.name}</span></Link>
                                        </div>
                                        <div className="job__detail">
                                            <div className="job__detail--address">
                                                <div className="job__icon">
                                                    <i className="fas fa-map-marker-alt"></i>
                                                </div>
                                                <span>{ok.address}</span>
                                            </div>
                                            <div className="job__detail--deadline outSize outSize">
                                                <div className="job__icon">
                                                    <i className="far fa-clock"></i>
                                                </div>
                                                <span>{formatDateWork(ok.createdAt)}</span>
                                            </div>
                                            <div className="job__detail--salary">
                                                <div className="job__icon">
                                                    <i className="fas fa-dollar-sign"></i>
                                                </div>
                                                <span>{ok.price1} - {ok.price2} Triệu VNĐ</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
