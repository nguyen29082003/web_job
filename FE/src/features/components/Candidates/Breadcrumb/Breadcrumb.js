import React from 'react'
import { Link } from 'react-router-dom'
import "../../../scss/Breadcrumb.scss"
export default function Breadcrumb() {
    return (
        <div className="breadcrumb">
            <div className="container">
                <Link to="/">Trang chủ</Link>
                <span className="fa fa-angle-double-right"></span>
                <span className="active">Ứng viên</span>
            </div>
        </div>
    )
}
