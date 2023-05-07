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

interface RoomObject {
  members: string[];
  name: string;
}

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;
const { Title } = Typography;
type MenuItem = Required<MenuProps>["items"][number];

const AppLayout = ({ children }: any) => {
  const { getRoomId, getRoomsItems, currentRoomName, fetchRoom } = RoomStore;

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

  const handleOk = () => {
    joinToRoom(String(modalInputValue));
    closeModal();
  };

  const handleCancel = () => {
    setIsNewRoomModalVisible(false);
    closeModal();
  };

  useEffect(() => {
    fetchRoom();
  }, [isNewRoomModalVisible]);

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

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="layout_sider"
      >
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: "5px 10px",
            width: "100%",
            backgroundColor: "transparent",
          }}
        >
          <Title level={3} style={{ padding: "10px" }}>
            {getRoomId() !== null && `Room Name: ${currentRoomName}`}
          </Title>
        </Header>
        <Content style={{ margin: "0 16px" }} className="center">
          {children}
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>ChatApp version :</Footer> */}
      </Layout>
    </Layout>
  );
};

export default observer(AppLayout);
