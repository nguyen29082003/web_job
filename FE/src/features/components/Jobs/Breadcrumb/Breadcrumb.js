import React from 'react'
import "../../../scss/Breadcrumb.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
export default function Breadcrumbs() {
    return (
        <div className="breadcrumb">
            <div className="container">
                <Link to="/">Trang chủ</Link>
                <span className="fa fa-angle-double-right"></span>
                <span className="active">Việc làm</span>
            </div>
        </div>
    )
}
