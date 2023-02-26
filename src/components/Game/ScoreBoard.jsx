import React from "react";
import { useSelector } from "react-redux";

const ScoreBoard = () => {
  const score = useSelector((state) => state.score);
  return <h1 className="score_board">Current Score: {score}</h1>;
};

export default ScoreBoard;
