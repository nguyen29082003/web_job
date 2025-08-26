import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumb({ name }) {
    return (
        <div className="breadcrumb mb-0">
            <div className="container">
                <Link to="/">Trang chủ</Link>
                <span className="fa fa-angle-double-right"></span>
                <Link to="/companys">Công ty</Link>
                <span className="fa fa-angle-double-right"></span>
                <span className="active">{name}</span>
            </div>
        </div>
    )
}
