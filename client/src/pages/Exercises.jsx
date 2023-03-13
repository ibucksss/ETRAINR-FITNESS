import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Select } from "antd";
import "../styles/exercises.css";
import Data from "../components/Data";
import Navbar from "../components/Navbar";
function Exercises() {
  const [equipmentUsed, setEquipmentUsed] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [data, setData] = useState([]);
  const { Option } = Select;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "af45a354f7mshecad2a88476ff54p18eaf2jsnfe287651f17c",
      "X-RapidAPI-Host": "exercises2.p.rapidapi.com",
    },
  };
  const handleClick = async () => {
    const response = await fetch(
      `https://exercises2.p.rapidapi.com/?bodyPart=${bodyPart}&muscleTarget=${muscleGroup}&equipmentUsed=${equipmentUsed}&count=18`,
      options
    );

    const data = await response.json();
    setData(data);
    console.log(data);
  };
  useEffect(() => {
    handleClick();
  }, [muscleGroup, bodyPart, equipmentUsed]);

  return (
    <div className="exercises">
      <Navbar />
      <div className="exercise-top-row">
        <div className="exercise-header">
          <h3>Find Your Next Workout</h3>
          <p>
            Find a workout fit for you. Sort by muscle group, body part and
            equipment used.
          </p>
        </div>
        <div className="selects">
          <Select
            showSearch
            mode="multiple"
            onChange={(value) => setMuscleGroup(value)}
            placeholder="Sort By Muscle Group"
          >
            <Option value="abductors">Abductors</Option>
            <Option value="abs">Abs</Option>
            <Option value="adductors">Adductors</Option>
            <Option value="biceps">Biceps</Option>
            <Option value="calves">Calves</Option>
            <Option value="cardiovascular-system">Cardio System</Option>
            <Option value="delts">Delts</Option>
            <Option value="forearms">Forearms</Option>
            <Option value="glutes">Glutes</Option>
            <Option value="hamstrings">Hamstrings</Option>
            <Option value="lats">Lats</Option>
            <Option value="pectorals">Pectorals</Option>
            <Option value="quads">Quads</Option>
            <Option value="serratus-anterior">Serratus Anterior</Option>
            <Option value="spine">Spine</Option>
            <Option value="traps">Traps</Option>
            <Option value="triceps">Triceps</Option>
            <Option value="upper-back">Upper Back</Option>\
          </Select>

          <Select
            showSearch
            onChange={(value) => setBodyPart(value)}
            placeholder="Sort by Body Part"
            mode="multiple"
          >
            <Option value="back">Back</Option>
            <Option value="cardio">Cardio</Option>
            <Option value="chest">Chest</Option>
            <Option value="lower-arms">Lower Arms</Option>
            <Option value="lower-legs">Lower Legs</Option>
            <Option value="neck">Neck</Option>
            <Option value="shoulders">Shoulders</Option>
            <Option value="upper-arms">Upper Arms</Option>
            <Option value="upper-legs">Upper Legs</Option>
            <Option value="waist">Waist</Option>
          </Select>
          <Select
            showSearch
            mode="multiple"
            onChange={(value) => setEquipmentUsed(value)}
            placeholder="Sort by Equipment"
          >
            <Option value="assisted">Assisted</Option>
            <Option value="band">Band</Option>
            <Option value="barbell">Barbell</Option>
            <Option value="body-weight">Body Weight</Option>
            <Option value="bosu-ball">Bosu Ball</Option>
            <Option value="cable">Cable</Option>
            <Option value="dumbbell">Dumbbell</Option>
            <Option value="elliptical-machine">Elliptical</Option>
            <Option value="ez-barbell">EZ Barbell</Option>
            <Option value="hammer">Hammmer</Option>
            <Option value="kettlebell">Kettle Bell</Option>
            <Option value="leverage-machine">Leverage Machine</Option>
            <Option value="medicine-ball">Medicine Ball</Option>
            <Option value="olympic-barbell">Olympic Barbell</Option>
            <Option value="resistance-band">Resistance Band</Option>
            <Option value="roller">Roller</Option>
            <Option value="rope">Rope</Option>
            <Option value="skierg-machine">Skierg Machine</Option>
            <Option value="sled-machine">Sled Machine</Option>
            <Option value="smith-machine">Smith Machine</Option>
            <Option value="stability-ball">Stability Ball</Option>
            <Option value="stationary-bike">Stationary Bike</Option>
            <Option value="stepmill-machine">Stairmaster</Option>
            <Option value="tire">Tire</Option>
            <Option value="trap-bar">Trap Bar</Option>
            <Option value="upper-body-ergometer">Upper Body Ergometer</Option>
            <Option value="weighted">Weighter</Option>
            <Option value="wheel-roller">Wheel Roller</Option>
            <Option value="">Clear</Option>
          </Select>
        </div>
      </div>
      <div>
        <Data data={data} />
      </div>
    </div>
  );
}

export default Exercises;
