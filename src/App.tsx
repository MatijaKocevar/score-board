import { useState } from "react";
import "./App.scss";
import ScoreBoard, { Game } from "./component/ScoreBoard/ScoreBoard";
import ScoreBoardInputs from "./component/ScoreBoardInputs/ScoreBoardInputs";

function App() {
	const [game, setGame] = useState<Game>();

	return (
		<div className='app-container'>
			<h1 style={{ textAlign: "center" }}>Score Board</h1>
			<ScoreBoardInputs setGame={setGame} />
			<ScoreBoard {...game} />
		</div>
	);
}

export default App;
