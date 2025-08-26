import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../scss/DetailJob/BannerJob.scss";

export default function BannerJob(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        // Điều hướng đến trang chi tiết công ty
        // Bạn có thể thay đổi `/company/${props.companyId}` thành slug nếu cần
        navigate(`/companys/${props.id}`);
    };

    return (
        <div className="bannerJob" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div
                className="container"
                style={{
                    background: `url(${props.banner}) repeat center`,
                    backgroundSize: 'cover'
                }}
            >
                <div className="bannerJob__content">
                    <div className="bannerJob__content__logo">
                        <img src={props.avatar} alt="" />
                    </div>
                    <div className="bannerJob__content__title">
                        <div className="title--top">Mời bạn đến với công ty</div>
                        <div className="title--bot">{props.name}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
