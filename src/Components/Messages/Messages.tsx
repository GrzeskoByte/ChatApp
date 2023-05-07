import * as React from "react";

import { Row, Col, Empty, Input, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { map } from "lodash";

import "./messages.css";
import { RoomStore } from "../../_stores";
import { observer } from "mobx-react";

interface MessagesInteface {
  body: string;
  createdAt: Date;
  roomId: string;
  userId: string;
}

type Messages = MessagesInteface | string[] | null | any;

const Messages = () => {
  const messages: Messages = RoomStore.getMessages();

  if (!messages) return <Spin />;

  return (
    <Col className="chat_container">
      <Col className="messages_container" span={24}>
        {map(messages, (message) => {
          return (
            <Row className="message_container" key={message.id}>
              {message.body}
            </Row>
          );
        })}
      </Col>
      <Input
        placeholder="Send a message"
        className="message_input"
        suffix={<SendOutlined style={{ cursor: "pointer" }} />}
        size="large"
      />
    </Col>
  );
};

export default observer(Messages);
