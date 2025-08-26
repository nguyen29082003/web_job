import React from 'react'
import { Link } from 'react-router-dom'
import "../../../scss/Breadcrumb.scss"
export default function Breadcrumb(props) {
    return (
        <div className="breadcrumb">
            <div className="container">
                <Link to="/">Trang chủ</Link>
                <span className="fa fa-angle-double-right"></span>
                <Link to="/news">Tin tức</Link>
                <span className="fa fa-angle-double-right"></span>
                <span className="active">{props.name}</span>
            </div>
        </div>
    )
}
