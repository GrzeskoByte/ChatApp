import {
  MessageOutlined,
  PlusOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Input, Layout, Menu, Modal, theme, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { RoomStore, UserStore } from "../_stores/index";

import { joinToRoom } from "../_utilities/FirebaseHelpers";

import { observer } from "mobx-react";
import "./layout.css";

import { map } from "lodash";

interface RoomObject {
  members: string[];
  name: string;
}

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;
const { Title } = Typography;
type MenuItem = Required<MenuProps>["items"][number];

const AppLayout = ({ children }: any) => {
  const { getRoomId, currentRoomName, loadData, getRoomsItems } = RoomStore;

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [isNewRoomModalVisible, setIsNewRoomModalVisible] =
    useState<boolean>(false);

  const [modalInputValue, setModalInputValue] = useState<string>();

  const handleOpenNewRoom = () => {
    setIsNewRoomModalVisible(true);
  };

  const items: MenuItem[] = [
    {
      label: "Rooms",
      key: Math.random(),

      icon: (
        <div onClick={() => {}}>
          <MessageOutlined />
        </div>
      ),

      children: [
        ...getRoomsItems,
        {
          label: "Enter to room",
          key: Math.random(),
          icon: <PlusOutlined />,
          onClick: handleOpenNewRoom,
        },
      ],
    },

    {
      label: "Sign out",
      key: Math.random(),
      icon: (
        <div>
          <PoweroffOutlined />
        </div>
      ),
      onClick: () => UserStore.logout(),
    },
  ];

  const handleModalInputChange = ({ target: { value } }: any): void => {
    setModalInputValue(value);
  };

  const closeModal = () => {
    setIsNewRoomModalVisible(false);
  };

  const handleOk = async () => {
    joinToRoom(String(modalInputValue));
    await loadData();
    closeModal();
  };

  const handleCancel = () => {
    setIsNewRoomModalVisible(false);
    closeModal();
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Modal
        centered
        open={isNewRoomModalVisible}
        title={"Enter new room key"}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input onChange={handleModalInputChange} value={modalInputValue} />
      </Modal>

      <Header
        className="layout_header"
        style={{
          padding: 0,
          backgroundColor: "#001529",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="top_bar_container">
          <Title level={3} style={{ color: "#fff", margin: 0 }}>
            {getRoomId() !== null && `${currentRoomName}`}
          </Title>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
            items={items}
            className="main_menu"
          />
        </div>
      </Header>

      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{ padding: 24, background: "#fff", minHeight: 360 }}
            className="center"
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default observer(AppLayout);
