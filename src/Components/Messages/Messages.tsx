import * as React from "react";

import { Avatar, Col, Input, List, Spin, Typography } from "antd";

import { SendOutlined } from "@ant-design/icons";

import { observer } from "mobx-react";
import { RoomStore } from "../../_stores";
import "./messages.css";

import { getInitials } from "../../_utilities/Helpers";

import { sendMessage } from "../../_utilities/FirebaseHelpers";

import {
  collection,
  getFirestore,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";

import { firestore } from "../../_utilities/Firebase";

import { UserStore } from "../../_stores/index";
import { orderBy } from "lodash";
interface MessagesInteface {
  body: string;
  createdAt: Date;
  roomId: string;
  userId: string;
}

type Messages = MessagesInteface | string[] | null | any;

const { Text, Title } = Typography;

const Messages = () => {
  const { loadData, getRoomId } = RoomStore;

  const messages: Messages = RoomStore.getMessages();

  const [currentMessage, setCurrentMessage] = React.useState<string>("");

  const handleWriteMessage = (e: any) => {
    setCurrentMessage(e);
  };

  const handleSendMessage = (e: any) => {
    sendMessage(currentMessage);
    setCurrentMessage("");
  };

  if (!messages) return <Spin />;

  return (
    <Col className="chat_container">
      {messages && (
        <List
          dataSource={orderBy(messages, ["createdAt"], ["asc"])}
          className="messages_container"
          renderItem={(item: any) => {
            return (
              <List.Item className="message_item">
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src="https://joeschmoe.io/api/v1/random"
                      style={{ backgroundColor: "cadetblue", margin: "0 10px" }}
                    >
                      {getInitials(item.createdBy)}
                    </Avatar>
                  }
                  title={
                    <a href="https://ant.design">
                      {item?.createdBy ?? "unknown user"}
                    </a>
                  }
                  description={<Text>{item.body}</Text>}
                />
              </List.Item>
            );
          }}
        />
      )}

      <Input
        placeholder="Send a message"
        className="message_input"
        suffix={
          <SendOutlined
            style={{ cursor: "pointer" }}
            onClick={handleSendMessage}
          />
        }
        size="large"
        onChange={(e: any) => handleWriteMessage(e.target.value)}
        value={currentMessage}
      />
    </Col>
  );
};

export default observer(Messages);
