import React, { useState, useEffect } from "react";
import { Form, message, Input, Spin } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Pilates from "../assets/pilates.svg";
function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      message.error("Something went wrong");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("workout-tracker-user")) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="register">
      <div className="register-left">
        <img src={Pilates} alt="" />
      </div>
      <div className="register-right">
        {loading && <Spin size="large" />}
        <Form className="form" layout="vertical" onFinish={onFinish}>
          <div className="header">
            <h1>Exercise. Track. Repeat.</h1>
            <h5>Start Your Journey Now</h5>
          </div>

          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input />
          </Form.Item>
          <div className="link-container">
            <Link to="/login">Already Registered? Click Here To Login</Link>
            <button type="primary" htmlType="submit" className="submit-btn">
              Register
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
