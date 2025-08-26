import Avatar from "antd/lib/avatar/Avatar";
import React from 'react'
import { Link } from 'react-router-dom'
import anh from "../../../images/xinviec.jpg"
import "../../../scss/DetailNew/BannerNew.scss"
export default function BannerNew(props) {
    console.log(props);
    const style = {
        background: `url(${props.img}) repeat center`,
        backgroundSize: "cover"
    }
    return (
        <div className="bannerNew" style={style}>
            <div className="bannerNew__content">
                <div className="bannerNew__content__title">
                    <span>{props.title}</span>
                </div>
                <div className="bannerNew__content__tag">
                    {props.tags.map(data => (
                        <div className="newTag"><Link to="">{data.name}</Link></div>
                    ))}
                </div>
                <div className="bannerNew__content__date">
                    <Avatar size="large" src={anh} className="avatarNew" />
                    <span >Quỳnh Chi lúc 26 Tháng Hai, 2021</span>
                </div>
            </div>
        </div>
    )
}
