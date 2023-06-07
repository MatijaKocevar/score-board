import { useState } from "react";
import "./App.scss";
import ScoreBoard, { Game } from "./component/ScoreBoard/ScoreBoard";
import ScoreBoardInputs from "./component/ScoreBoardInputs/ScoreBoardInputs";

function App() {
	const [game, setGame] = useState<Game>();

	return (
		<>
			<div className='score-board__wrapper'>
				<div className='score-board__title'>Score Board</div>
				<ScoreBoardInputs setGame={setGame} />
			</div>
			<ScoreBoard {...game} />
			<div>What</div>
		</>
	);
}

export default App;
