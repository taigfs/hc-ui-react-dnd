import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import React from "react";
import styled from "styled-components";

import logoImg from "../assets/logo-64.png";
import { SiteLinks } from "../enum/SiteLinks";

export const LoginPage = () => {
  const onFinish = (values: { username: string; password: string }) => {
    window.location.href = SiteLinks.Projects;
  };

  return (
    <Container>
      <LogoImg src={logoImg} alt="Logo" />
      <StyledH2>Login</StyledH2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ username: "taigfs@gmail.com", password: "123456" }}
        onFinish={onFinish}
      >
        <Form.Item name="username" rules={[{ required: true, message: "" }]}>
          <Input
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "" }]}>
          <Input
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <div style={{ marginTop: 16 }}>
            <a href="/">Register</a>
          </div>
        </Form.Item>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  max-width: 400px;
  border: ${({ theme }) => theme.color.squareBorder};
  border-radius: 8px;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
`;

const StyledH2 = styled.h2`
  text-align: center;
  margin-bottom: 16px;
  margin-top: 32px;
`;

const LogoImg = styled.img`
  border-radius: 50%;
`;
