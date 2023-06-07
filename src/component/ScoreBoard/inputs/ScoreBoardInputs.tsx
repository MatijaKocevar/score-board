import { FC, useCallback, useState } from "react";
import { Game } from "../ScoreBoard";
import "./ScoreBoardInputsStyle.scss";

interface ScoreBoardInputProps {
	setGame: React.Dispatch<React.SetStateAction<Game | undefined>>;
}

const ScoreBoardInputs: FC<ScoreBoardInputProps> = ({ setGame }) => {
	const [gameInputs, setGameInputs] = useState<Game>();

	const handleNewUpdateGame = useCallback(() => {
		setGame({
			homeTeam: gameInputs?.homeTeam,
			homeScore: gameInputs?.homeScore,
			awayTeam: gameInputs?.awayTeam,
			awayScore: gameInputs?.awayScore,
		});
	}, [gameInputs, setGame]);

	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = event.target;
			setGameInputs((prevGame) => ({ ...prevGame, [name]: value }));
		},
		[setGameInputs]
	);

	return (
		<>
			<div className='score-board__inputs'>
				<input
					id='home-team__name-input'
					className='home-team__name'
					name='homeTeam'
					value={gameInputs?.homeTeam ?? ""}
					placeholder='Home Team'
					onChange={handleInputChange}
				/>
				<input
					id='home-team__score-input'
					className='home-team__score'
					name='homeScore'
					placeholder='0'
					value={gameInputs?.homeScore ?? ""}
					onChange={handleInputChange}
				/>
				<div> - </div>
				<input
					id='away-team__score-input'
					className='away-team__score'
					name='awayScore'
					placeholder='0'
					value={gameInputs?.awayScore ?? ""}
					onChange={handleInputChange}
				/>
				<input
					id='away-team__name-input'
					className='away-team__name'
					name='awayTeam'
					value={gameInputs?.awayTeam ?? ""}
					placeholder='Away Team'
					onChange={handleInputChange}
				/>
			</div>
			<br />
			<div className='score-board__actions'>
				<button className='new-game__button' onClick={handleNewUpdateGame}>
					New/Update Game
				</button>
				<button className='finish-game__button'>Finish game</button>
			</div>
		</>
	);
};

export default ScoreBoardInputs;
