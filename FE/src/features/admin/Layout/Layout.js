import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "../../scss/Admin/Nav.scss";
import CheckCompany from "../CheckCompany/CheckCompany";
import AddContact from "../Contact/AddContact";
import Contact from "../Contact/Contact";
import AddFormCv from "../FormCV/AddFormCV";
import FormCv from "../FormCV/FormCV";
import Jobs from "../Jobs/Jobs";
import AddNew from "../News/AddNew";
import News from "../News/News";
import Revenue from "../Revenue/Revenue";
import AddSocialNetwork from "../SocialNetwork/addSocialNetwork";
import SocialNetwork from "../SocialNetwork/SocialNetwork";
import AddTag from "../Tag/AddTag";
import Tag from "../Tag/Tag";
import AddTypeWork from "../TypeWork/AddTypeWork";
import TypeWork from "../TypeWork/TypeWork";
import User from "../User/User";

export default function Nav() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const menuItems = useMemo(() => [
    // { key: "1", icon: <span className="far fa-newspaper"></span>, label: <Link to="/admin">Doanh thu</Link> },
    { key: "4", icon: <span className="fas fa-check"></span>, label: <Link to="/admin/checkCompany">Kiểm tra tài khoản</Link> },
    // { key: "3", icon: <span className="far fa-newspaper"></span>, label: <Link to="/admin/new">Tin tức</Link> },
    { key: "2", icon: <span className="fas fa-tags"></span>, label: <Link to="/admin/tag">Tag</Link> },
    { key: "5", icon: <span className="fas fa-code-branch"></span>, label: <Link to="/admin/typeWork">Loại công việc</Link> },
    { key: "6", icon: <span className="fas fa-briefcase"></span>, label: <Link to="/admin/work">Công việc</Link> },
    // { key: "7", icon: <span className="fas fa-layer-group"></span>, label: <Link to="/admin/formCV">Form CV</Link> },
    { key: "8", icon: <span className="fas fa-address-book"></span>, label: <Link to="/admin/contact">Phản ánh người dùng</Link> },
    { key: "10", icon: <span className="fab fa-twitter"></span>, label: <Link to="/admin/socialNetwork">Mạng xã hội</Link> },
    { key: "11", icon: <span className="fas fa-user-injured"></span>, label: <Link to="/admin/users">Cấp quyền</Link> },
  ], []);

  return (
    <div id="nav">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <Link to="/">
              <p className="text-center w-100">
                {collapsed ? <i className="fas fa-user-shield"></i> : <strong>Administration</strong>}
              </p>
            </Link>
          </div>
          <Menu theme="dark" mode="inline" items={menuItems} />
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            className="site-layout-background h-100vh"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="/" element={<Revenue />} />
              {/* <Route path="new" element={<News />} /> */}
              <Route path="tag" element={<Tag />} />
              <Route path="socialNetwork" element={<SocialNetwork />} />
              <Route path="contact" element={<Contact />} />
              <Route path="formCV" element={<FormCv />} />
              <Route path="work" element={<Jobs />} />
              <Route path="users" element={<User />} />
              <Route path="typeWork" element={<TypeWork />} />
              <Route path="checkCompany" element={<CheckCompany />} />
              <Route path="formCV/addFormCV" element={<AddFormCv />} />
              <Route path="formCV/editFormCV/:id" element={<AddFormCv />} />
              <Route path="socialNetwork/addSocialNetwork" element={<AddSocialNetwork />} />
              <Route path="socialNetwork/editSocialNetwork/:id" element={<AddSocialNetwork />} />
              <Route path="contact/addContact" element={<AddContact />} />
              <Route path="contact/editContact/:id" element={<AddContact />} />
              <Route path="tag/addTag" element={<AddTag />} />
              <Route path="tag/editTag/:id" element={<AddTag />} />
              <Route path="typeWork/addTypeWork" element={<AddTypeWork />} />
              <Route path="typeWork/editTypeWork/:id" element={<AddTypeWork />} />
              <Route path="new/editNew/:id" element={<AddNew />} />
              <Route path="new/addNew" element={<AddNew />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
