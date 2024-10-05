// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenTemplate from "../../components/authen-template";
import { Form, Input, message } from "antd";
import api from "../../config/axios";
import { toast } from "react-toastify";

function RegisterPage() {
  //chuyển trang bằng react hook
  const navigate = useNavigate();
  const handleRegister = async (values) => {
    //submit xuống BE
    try {
      const respone = await api.post("register", values);
      console.log(respone);

      toast.success("Successfully register new account!");
      navigate("/login");
    } catch (err) {
      toast.error(err.respone.data); //BE trả lỗi
    }
  };
  return (
    <AuthenTemplate>
      <Form labelCol={{ span: 24 }} onFinish={handleRegister}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters long",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Fullname"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Please input your fullname",
            },
            {
              pattern: /^[a-zA-Z\s]+$/,
              message: "Fullname can only contain letters and spaces",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number",
            },
            {
              pattern: /^\d{10,11}$/,
              message: "Phone number must be 10-11 digits",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Link to="/login">Already have account? Let's Login</Link>

        <Form.Item>
          <button type="primary" htmlTpye="submit">
            Register
          </button>
        </Form.Item>
      </Form>
    </AuthenTemplate>
  );
}

export default RegisterPage;
