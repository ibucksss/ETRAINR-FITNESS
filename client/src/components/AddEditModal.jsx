import { React, useState } from "react";
import { Modal, Form, Input, Select, message, Button } from "antd";
import { useNavigate } from "react-router-dom";

// import Spinner from "../components/Spinner";
import axios from "axios";
import "../styles/modal.css";
const { Option } = Select;
const AddEditModal = ({
  showAddEditWorkoutModal,
  setShowAddEditWorkoutModal,
  selectedEditItem,
  getWorkouts,
  setSelectedEditItem,
}) => {
  //State for loading Spinner
  //   const [loading, setLoading] = useState(false);
  //Navigation to other pages
  const navigate = useNavigate(true);
  //Runs after user submits modal for new transaction or for edit
  const onFinish = async (values) => {
    //Try catch block
    try {
      //user set to local storage user
      const user = JSON.parse(localStorage.getItem("workout-tracker-user"));
      //   setLoading(true);
      if (selectedEditItem) {
        await axios.post("/api/workouts/edit-workout", {
          payload: {
            ...values,
            userid: user._id,
          },
          workoutId: selectedEditItem._id,
        });
        //getWorkouts function runs to re-render components with updated info
        getWorkouts();
        message.success("Workouts Updated Succesfully");
      } else {
        await axios.post("/api/workouts/add-workout", {
          ...values,
          userid: user._id,
        });
        getWorkouts();
        message.success("Workout Added Successfully");
      }
      setShowAddEditWorkoutModal(false);
      setSelectedEditItem(null);
      //   setLoading(false);
    } catch (error) {
      message.error("Something went wrong");
      //   setLoading(false);
    }
  };
  return (
    <>
      <Modal
        title={selectedEditItem ? "Edit Workout" : "Add Workout"}
        open={!showAddEditWorkoutModal}
        onCancel={() => setShowAddEditWorkoutModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          className="workout-form"
          onFinish={onFinish}
          initialValues={selectedEditItem}
        >
          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input workout type",
              },
            ]}
          >
            <Select>
              <Option value="Cardio">Cardio</Option>
              <Option value="Strength">Strength</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input category",
              },
            ]}
          >
            <Select allowClear>
              <Option value="Abdominals">Abdominals</Option>
              <Option value="Abductors">Abductors</Option>
              <Option value="Adductors">Adductors</Option>
              <Option value="Back">Back</Option>
              <Option value="Biceps">Biceps</Option>
              <Option value="Calves">Calves</Option>
              <Option value="Chest">Chest</Option>
              <Option value="Forearms">Forearms</Option>
              <Option value="Glutes">Glutes</Option>
              <Option value="Hamstrings">Hamstrings</Option>
              <Option value="Lats">Lats</Option>
              <Option value="Neck">Neck</Option>
              <Option value="Quadriceps">Quadriceps</Option>
              <Option value="Traps">Traps</Option>
              <Option value="Triceps">Triceps</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Please input date",
              },
            ]}
          >
            <Input type="date"></Input>
          </Form.Item>
          <Form.Item
            label="Time"
            name="time"
            rules={[
              {
                required: true,
                message: "Please input time",
              },
            ]}
          >
            <Input type="number"></Input>
          </Form.Item>
          <Form.Item
            label="Calories Burned"
            name="calories"
            rules={[
              {
                required: true,
                message: "Please input calories",
              },
            ]}
          >
            <Input type="number"></Input>
          </Form.Item>
          <Form.Item label="Description(optional)" name="description">
            <Input type="text"></Input>
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button className="primary" type="submit">
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddEditModal;
