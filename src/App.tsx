import "./App.scss";
import ScoreBoard from "./component/ScoreBoard/ScoreBoard";

function App() {
  return (
    <div className="score-board__wrapper">
      <div className="score-board__title">Score Board</div>
      <ScoreBoard
        homeTeam="Slovenia"
        homeScore={0}
        awayTeam="France"
        awayScore={1}
      />
    </div>
  );
}

export default App;
