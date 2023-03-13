import AddEditModal from "../components/AddEditModal";
import React, { useState, useEffect } from "react";
import { message, Table, Select, DatePicker, Spin } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Moment from "react-moment";
import "../styles/home.css";
import ImageBH from "../assets/imagebh.svg";
import Graphs from "../components/Graphs";
import Navbar from "../components/Navbar";
const { Option } = Select;
const { RangePicker } = DatePicker;
function Home() {
  const [loading, setLoading] = useState(false);
  const [showAddEditWorkoutModal, setShowAddEditWorkoutModal] = useState(false);
  const [workoutData, setWorkoutData] = useState([]);
  const [viewType, setViewType] = useState("table");
  const [type, setType] = useState("all");
  const [frequency, setFrequency] = useState("7");
  const [selectedRange, setSelectedRange] = useState([]);
  const [selectedEditItem, setSelectedEditItem] = useState(null);
  const getWorkouts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("workout-tracker-user"));
      setLoading(true);
      const response = await axios.post("/api/workouts/get-all-workouts", {
        userid: user._id,
        frequency,
        ...(frequency === "custom" && { selectedRange }),
        type,
      });
      setWorkoutData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
      console.log(error);
    }
  };
  const deleteWorkout = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/workouts/delete-workout", {
        workoutId: record._id,
      });
      message.success("Workout Deleted");
      getWorkouts();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    getWorkouts();
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => <Moment format="MM-DD-YYYY">{date}</Moment>,
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Calories",
      dataIndex: "calories",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      render: (text, record) => {
        return (
          <div className="flex">
            <EditOutlined
              className="edit-btn"
              onClick={() => {
                setSelectedEditItem(record);
                setShowAddEditWorkoutModal(true);
              }}
            />
            <DeleteOutlined
              className="mx-3 delete-btn"
              onClick={() => deleteWorkout(record)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="home">
      <Navbar />
      <div className="main-content">
        {loading && <Spin size="large" />}
        <div className="top-row">
          <div className="top-left">
            <div className="date-select">
              <h6>Select Frequency</h6>
              <Select
                style={{ width: 150 }}
                value={frequency}
                onChange={(value) => setFrequency(value)}
              >
                <Option value="7">This Week</Option>
                <Option value="30">This Month</Option>
                <Option value="365">This Year</Option>
                <Option value="custom">Custom</Option>
                {frequency === "custom" && (
                  <div className="mt-2">
                    <RangePicker
                      value={selectedRange}
                      onChange={(values) => setSelectedRange(values)}
                    ></RangePicker>
                  </div>
                )}
              </Select>
            </div>
            <div className="workout-type-select mx-5">
              <h6>Select Type</h6>
              <Select value={type} onChange={(value) => setType(value)}>
                <Option value="all">All</Option>
                <Option value="Cardio">Cardio</Option>
                <Option value="Strength">Strength</Option>
              </Select>
            </div>
          </div>
          <div className="top-right">
            <div className="type-select">
              <UnorderedListOutlined
                className={`${
                  viewType === "table" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewType("table")}
              />
              <AreaChartOutlined
                className={`${
                  viewType === "analytics" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewType("analytics")}
              />
            </div>
            <button
              className="home-btn"
              onClick={() => setShowAddEditWorkoutModal(true)}
            >
              Add Workout
            </button>
          </div>
        </div>
      </div>
      <div className="table-anatytics">
        {viewType === "table" ? (
          <div className="table">
            <Table
              className="cols"
              columns={columns}
              dataSource={workoutData}
            ></Table>
          </div>
        ) : (
          <Graphs workout={workoutData} />
        )}
      </div>
      {showAddEditWorkoutModal && (
        <div>
          <AddEditModal
            getWorkouts={getWorkouts}
            showAddEditTransactionModel={showAddEditWorkoutModal}
            selectedEditItem={selectedEditItem}
            setShowAddEditWorkoutModal={setShowAddEditWorkoutModal}
            setSelectedEditItem={setSelectedEditItem}
          />
        </div>
      )}
      <div className={`${viewType === "analytics" ? "no-img" : "bg-image"}`}>
        <img src={ImageBH} alt="" />
      </div>
    </div>
  );
}
export default Home;
