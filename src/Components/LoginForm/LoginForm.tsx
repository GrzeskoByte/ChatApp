import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Space, message } from "antd";

import "./LoginForm.css";

import { UserStore } from "../../_stores/index";

import { observer } from "mobx-react";

interface UserCredintials {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { signIn, getUser } = UserStore;
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: UserCredintials) => {
    const { username, password } = values;

    if (await signIn(username, password)) return message.info("logged in");

    message.error("unable to log in");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Space direction="vertical" className="loginForm_container">
      {contextHolder}
      <h2>ChatApp</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="login_form"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default observer(LoginForm);
