import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import "../styles/auth.css";
import axios from "axios";
import FitnessIll from "../assets/fitness-apps.svg";
import { useNavigate, Link } from "react-router-dom";
function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);

      localStorage.setItem(
        "workout-tracker-user",
        JSON.stringify({ ...response.data, password: "" })
      );
      setLoading(false);
      message.success("Login Successful");
      navigate("/home");
    } catch (error) {
      setLoading(false);
      message.error("Login Failed");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("workout-tracker-user")) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="login">
      <div className="login-left">
        {loading && <Spin size="large" />}
        <div className="login-header">
          <h3>Login</h3>
          <p>Better yourself today</p>
        </div>
        <Form
          onFinish={onFinish}
          className="form"
          name="basic"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input className="form-item" placeholder="email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password className="form-item" placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <div className="link-container">
            <Link className="register-link" to="/register">
              Already Registered? Click Here To Register
            </Link>
            <Button type="primary" htmlType="submit" className="submit-btn">
              Submit
            </Button>
          </div>
        </Form>
      </div>
      <div className="login-right">
        <div className="statement">Make Yourself Better. Today.</div>
        <img src={FitnessIll} alt="" />
      </div>
    </div>
  );
}

export default Login;
