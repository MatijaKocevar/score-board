import { useState } from "react";
import "./App.scss";
import ScoreBoard, { Game } from "./component/ScoreBoard/ScoreBoard";
import ScoreBoardInputs from "./component/ScoreBoard/inputs/ScoreBoardInputs";

function App() {
	const [game, setGame] = useState<Game>();

	return (
		<div className='score-board__wrapper'>
			<div className='score-board__title'>Score Board</div>
			<ScoreBoard {...game} />
			<br />
			<ScoreBoardInputs setGame={setGame} />
		</div>
	);
}

export default App;
