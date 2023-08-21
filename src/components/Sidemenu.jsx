import {
    HomeOutlined,
    EditOutlined,
    BookOutlined,
    VideoCameraOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Menu } from "antd";
  import Sider from "antd/es/layout/Sider";
  import React, { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  
  export default function Sidemenu() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const [active, setActive] = useState("home");
    const navigate = useNavigate()
    function getItem(label, key, icon, children, type) {
      return {
        key,
        icon,
        children,
        label,
        type,
      };
    }
    const items = [
      getItem("Home", "home", <HomeOutlined />),
      getItem("Users", "users", <UserOutlined />),
      getItem("Content", "content", <BookOutlined />, [
        getItem("Posts", "posts", <EditOutlined />),
        getItem("Albums", "albums", <VideoCameraOutlined />)
      ]),
    ];

    useEffect(() => {
      // console.log(location.pathname.split("/")[1])
      setActive(location.pathname.split("/")[1])
    }, [location.pathname])
    return (
      <div>
          <Sider
            breakpoint="lg"
            collapsible
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
              zIndex: 20,
              backgroundColor: '#6a4c48'
            }}
            collapsed={collapsed}
            collapsedWidth={80}
            trigger={null}
            reverseArrow
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className="font-bold uppercase text-white py-5 justify-center">
              <center>AXA Test FE</center>
            </div>
            <Menu
              onClick={(e) => navigate(e.key) }
              selectedKeys={active}
              defaultSelectedKeys={"home"}
              defaultOpenKeys={['content']}
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              items={items}
            />
          </Sider>
      </div>
    );
  }
  