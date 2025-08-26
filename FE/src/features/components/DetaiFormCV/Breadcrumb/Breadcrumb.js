import React from 'react'
import { Link } from 'react-router-dom'
import "../../../scss/Breadcrumb.scss"
export default function Breadcrumb({ name }) {
    return (
        <div className="breadcrumb mb-0">
            <div className="container">
                <Link to="/">Trang chủ</Link>
                <span className="fa fa-angle-double-right"></span>
                <Link to="/createCv">Mẫu cv</Link>
                <span className="fa fa-angle-double-right"></span>
                <span className="active">{name ? name : ""}</span>
            </div>
        </div>
    )
}
