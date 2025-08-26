import { Image } from 'antd'
import React from 'react'
import "../../../scss/DetailCompany/BannerCompany.scss"
export default function BannerCompany({ avatar, banner, name, address }) {

    return (
        <div className="bannerCompany" style={{
            background: `url(${banner}) repeat center`,
            backgroundSize: "cover"
        }}>
            <div className="bannerCompany__content">
                <div className="bannerCompany__content__img">
                    <Image src={avatar} height="100%" />
                </div>
                <div className="company__margin">
                    <div className="bannerCompany__content__title">
                        {name}
                    </div>
                    <div className="bannerCompany__content__address">
                        {address}
                    </div>
                </div>
            </div>
        </div>
    )
}
