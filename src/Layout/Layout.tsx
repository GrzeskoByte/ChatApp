import { PoweroffOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Layout, Menu, theme } from "antd";
import React, { useState } from "react";

import { UserStore } from "../_stores/index";

import { observer } from "mobx-react";
import "./layout.css";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Grzegorz Sierocki",
    key: Math.random(),
    icon: (
      <Avatar
        style={{
          backgroundColor: "orange",
          fontSize: "12px",
        }}
      >
        GS
      </Avatar>
    ),
  },
  {
    label: "Sign out",
    key: Math.random(),

    icon: (
      <div
        onClick={() => {
          UserStore.logout();
        }}
      >
        <PoweroffOutlined />
      </div>
    ),
  },
];

const AppLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(true);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="layout_sider"
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        ></div>

        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>ChatApp version :</Footer>
      </Layout>
    </Layout>
  );
};

export default observer(AppLayout);
