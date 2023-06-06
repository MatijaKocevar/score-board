import { useState } from "react";
import "./App.scss";
import ScoreBoard, { Game } from "./component/ScoreBoard/ScoreBoard";

function App() {
  const [game, setGame] = useState<Game>({
    homeTeam: "",
    homeScore: "",
    awayTeam: "",
    awayScore: "",
  });

  const [currentGame, setCurrentGame] = useState<Game>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGame((prevGame) => ({ ...prevGame, [name]: value }));
  };

  const handleNewGame = () => {
    setCurrentGame({
      homeTeam: game.homeTeam,
      homeScore: game.homeScore,
      awayTeam: game.awayTeam,
      awayScore: game.awayScore,
    });
  };

  return (
    <div className="score-board__wrapper">
      <div className="score-board__title">Score Board</div>
      {currentGame && (
        <ScoreBoard
          homeTeam={currentGame.homeTeam}
          homeScore={currentGame.homeScore}
          awayTeam={currentGame.awayTeam}
          awayScore={currentGame.awayScore}
        />
      )}
      <br />
      <div className="score-board__inputs">
        <input
          id="home-team__name-input"
          className="home-team__name"
          name="homeTeam"
          value={game.homeTeam}
          onChange={handleInputChange}
        />
        <input
          id="home-team__score-input"
          className="home-team__score"
          name="homeScore"
          value={game.homeScore}
          onChange={handleInputChange}
        />
        <div> - </div>
        <input
          id="away-team__score-input"
          className="away-team__score"
          name="awayScore"
          value={game.awayScore}
          onChange={handleInputChange}
        />
        <input
          id="away-team__name-input"
          className="away-team__name"
          name="awayTeam"
          value={game.awayTeam}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div className="score-board__actions">
        <button className="new-game__button" onClick={handleNewGame}>
          New Game
        </button>
        <button className="update-game__button">Update Game</button>
        <button className="finishgame__button">Finish game</button>
      </div>
    </div>
  );
}

export default App;
