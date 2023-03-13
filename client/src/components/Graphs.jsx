import React from "react";

import { Row, Col, Progress } from "antd";
import "../styles/home.css";
function Graphs({ workout }) {
  const totalWorkouts = workout.length;
  const totalCardioWorkouts = workout.filter(
    (workout) => workout.type === "Cardio"
  );

  const totalCalories = workout.reduce(
    (acc, workout) => acc + workout.calories,
    0
  );
  const totalTime = workout.reduce((acc, workout) => acc + workout.time, 0);
  const totalStrengthWorkouts = workout.filter(
    (workout) => workout.type === "Strength"
  );
  const totalCardioPercentage =
    (totalCardioWorkouts.length / totalWorkouts) * 100;
  const totalStrengthPercentage =
    (totalStrengthWorkouts.length / totalWorkouts) * 100;
  const totalCalorieStrength = workout
    .filter((workout) => workout.type === "Strength")
    .reduce((acc, workout) => acc + workout.calories, 0);
  const totalCalorieCardio = workout
    .filter((workout) => workout.type === "Cardio")
    .reduce((acc, workout) => acc + workout.calories, 0);

  const categories = [
    "Abdominals",
    "Abductors",
    "Adductors",
    "Back",
    "Biceps",
    "Calves",
    "Chest",
    "Forearms",
    "Glutes",
    "Hamstrings",
    "Lats",
    "Neck",
    "Quadriceps",
    "Triceps",
  ];
  return (
    <div className="graphs">
      <Row className="card-grid">
        <Col className="card gutter-row" xs={{ span: 24 }} lg={{ span: 5 }}>
          <div>
            <h4>Total Workouts: {totalWorkouts}</h4>
            <hr />
            <h5>Cardio: {totalCardioWorkouts.length}</h5>
            <h5>Strength: {totalStrengthWorkouts.length}</h5>
          </div>
        </Col>
        <Col className="card gutter-row" xs={{ span: 24 }} lg={{ span: 6 }}>
          <h4>Cardio Overview</h4>
          <hr />
          <p>Percent of Cardio Workouts</p>
          <Progress
            className="mx-5 mt-5"
            strokeColor="#f72585"
            type="line"
            percent={totalCardioPercentage.toFixed(0)}
          />
          <p>Calories Burned During Cardio Workouts: {totalCalorieCardio}</p>
        </Col>
        <Col className="card gutter-row" xs={{ span: 24 }} lg={{ span: 6 }}>
          <h4>Strength Overview</h4>
          <hr />
          <p>Percent of Strength Workouts</p>
          <Progress
            className="mx-5 mt-5"
            strokeColor="#f72585"
            type="line"
            percent={totalStrengthPercentage.toFixed(0)}
          />
          <p>
            Calories Burned During Strength Workouts: {totalCalorieStrength}
          </p>
        </Col>
        <Col className="card" xs={{ span: 24 }} lg={{ span: 6 }}>
          <h5>Workout Overview</h5>
          <hr />
          <h5>Total Calories Burned: {totalCalories}</h5>
          <h5>Total Time Working Out: {totalTime}</h5>
        </Col>

        <Col className="card gutter-row cat-card" span={23}>
          <h5>Exercises By Category(measured by time spent)</h5>
          <hr />
          {categories.map((category) => {
            const time = workout
              .filter((workout) => workout.category === category)
              .reduce((acc, workout) => acc + workout.time, 0);
            return (
              time > 0 && (
                <div className="category-card">
                  <h5>{category}</h5>
                  <Progress percent={((time / totalTime) * 100).toFixed(0)} />
                </div>
              )
            );
          })}
        </Col>
      </Row>
    </div>
  );
}

export default Graphs;
