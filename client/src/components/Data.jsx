import React from "react";
import "../styles/exercises.css";
import { Row, Col, Divider } from "antd";
import Search from "../assets/search-on-web.svg";
const style = { background: "#0092ff", padding: "8px 0" };
function Data({ data }) {
  if (data.message == "no exercises found") {
    return (
      <div className="error-message">
        <h1>No Workouts Found With Given Parameters</h1>
        <img className="not-found-img" src={Search} alt="" />
      </div>
    );
  } else {
    return (
      <Row className="exercise-data-container">
        {data.map((data) => {
          return (
            <Col
              className="gutter-row"
              xs={{ span: 24 }}
              lg={{ span: 7 }}
              md={{ span: 11 }}
            >
              <div className="gutter-box">
                <h4 className="exercise-title">{data.name.toUpperCase()}</h4>
                <img className="exercise-img" src={data.image} alt="" />
                <div className="exercise-info">
                  <h5>Body Part: {data.bodyPart}</h5>
                  <h5>Muscle Group: {data.muscleTarget}</h5>
                  <h5>Equipment: {data.equipmentUsed}</h5>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default Data;
