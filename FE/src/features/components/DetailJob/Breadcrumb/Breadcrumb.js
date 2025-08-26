import React from 'react'
import "../../../scss/Breadcrumb.scss"
import { Link } from 'react-router-dom';
export default function Breadcrumb(props) {

    return (
        <div className="breadcrumb">
            <div className="container">
                <Link to="/">Trang chủ</Link>
                <span className="fa fa-angle-double-right"></span>
                <Link to="/">Việc làm</Link>
                <span className="fa fa-angle-double-right"></span>
                <span className="active">{props.name}</span>
            </div>
        </div>
    )
}
