import React from 'react'
import { Tabs } from 'antd';
import Jobs from "./Jobs/Jobs"
import AddJob from './AddJob/AddJob';
import UserApply from './UserApply/UserApply';
import Infor from "./infor/Infor"
export default function Tab({ id }) {
    const { TabPane } = Tabs;
    return (
        <div className="container mt-2">
            <Tabs defaultActiveKey="1" tabPosition="left">
                <TabPane tab="Các công việc đã đăng" key="1">
                    <Jobs id={id} heard={true} />
                </TabPane>
                <TabPane tab="Đăng tuyển việc" key="2">
                    <AddJob id={id} />
                </TabPane>
                <TabPane tab="Các ứng viêc ứng tuyển" key="3">
                    <UserApply id={id} />
                </TabPane>
                <TabPane tab="Thông tin công ty" key="4">
                    <Infor id={id} />
                </TabPane>
            </Tabs>
        </div>
    )
}
