import React from "react";
import "./ScoreBoardStyle.scss";

interface ScoreProps {
  homeTeam: string;
  homeScore: number;
  awayTeam: string;
  awayScore: number;
}

const ScoreBoard: React.FC<ScoreProps> = ({
  homeTeam,
  homeScore,
  awayTeam,
  awayScore,
}) => {
  return (
    <div className="scores-wrapper">
      <span id="home-team__name" className="home-team__name">
        {homeTeam}
      </span>
      <span id="home-team__score" className="home-team__score">
        {homeScore}
      </span>
      <span> - </span>
      <span id="away-team__score" className="away-team__score">
        {awayScore}
      </span>
      <span id="away-team__name" className="away-team__name">
        {awayTeam}
      </span>
    </div>
  );
};

export default ScoreBoard;
