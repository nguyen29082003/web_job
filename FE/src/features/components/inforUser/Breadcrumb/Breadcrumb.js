import React from 'react'
import "../../../scss/Breadcrumb.scss"
import { Link } from 'react-router-dom';
export default function Breadcrumbs({ name }) {

    return (
        <div className="breadcrumb">
            <div className="container">
                <Link to="/">Trang chủ</Link>
                <span className="fa fa-angle-double-right"></span>
                <Link to="/candidates">Ứng viên</Link>
                <span className="fa fa-angle-double-right"></span>
                <span className="active">{name}</span>
            </div>
        </div>
    )
}
