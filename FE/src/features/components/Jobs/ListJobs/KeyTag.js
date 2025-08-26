import React from 'react'
import { Link } from 'react-router-dom'
import "../../../scss/SearchJobs/KeyTag.scss"
export default function KeyTag() {
    return (
        <div className="box__key">
            <div className="key__title">
                <div className="key__icon"><i className="fab fa-slack-hash"></i></div>
                <span>Top tuyển dụng</span>
            </div>
            <div className="key__content">
                <div className="key__tag"><Link to="/jobs">reactjs</Link></div>
                <div className="key__tag"><Link to="/jobs">php</Link></div>
                <div className="key__tag"><Link to="/jobs">laravel</Link></div>
                <div className="key__tag"><Link to="/jobs">python</Link></div>
                <div className="key__tag"><Link to="/jobs">android</Link></div>
                <div className="key__tag"><Link to="/jobs">android</Link></div>
                <div className="key__tag"><Link to="/jobs">tuyển gấp</Link></div>
                <div className="key__tag"><Link to="/jobs">ios</Link></div>
                <div className="key__tag"><Link to="/jobs">sql</Link></div>
                <div className="key__tag"><Link to="/jobs">mysql</Link></div>
                <div className="key__tag"><Link to="/jobs">trí tuệ nhân tạo</Link></div>
                <div className="key__tag"><Link to="/jobs">.net</Link></div>
                <div className="key__tag"><Link to="/jobs">fulltime</Link></div>
                <div className="key__tag"><Link to="/jobs">partime</Link></div>
            </div>
        </div>
    )
}
