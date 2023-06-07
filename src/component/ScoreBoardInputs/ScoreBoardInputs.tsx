import { FC, useCallback, useState } from "react";
import { Game } from "../ScoreBoard/ScoreBoard";
import "./ScoreBoardInputsStyle.scss";

interface ScoreBoardInputProps {
	setGame: React.Dispatch<React.SetStateAction<Game | undefined>>;
}

const ScoreBoardInputs: FC<ScoreBoardInputProps> = ({ setGame }) => {
	const [gameInputs, setGameInputs] = useState<Game>();

	const handleNewUpdateGame = useCallback(() => {
		// Set the game state with the input values
		setGame({
			homeTeam: gameInputs?.homeTeam,
			homeScore: gameInputs?.homeScore,
			awayTeam: gameInputs?.awayTeam,
			awayScore: gameInputs?.awayScore,
		});
	}, [gameInputs, setGame]);

	const handleNameInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = event.target;
			// Update the specific input value in the gameInputs state
			setGameInputs((prevGame) => ({ ...prevGame, [name]: value }));
		},
		[setGameInputs]
	);

	const handleScoreInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = event.target;

			// Check if the input value is a valid integer
			if (/^\d*$/.test(value)) {
				// Update the specific input value in the gameInputs state
				setGameInputs((prevGame) => ({ ...prevGame, [name]: value }));
			}
		},
		[setGameInputs]
	);

	return (
		<>
			<div className='score-board__inputs-wrapper'>
				<div className='score-board__inputs'>
					<div className='home-team__wrapper'>
						<input
							id='home-team__name-input'
							className='home-team__name'
							name='homeTeam'
							value={gameInputs?.homeTeam ?? ""}
							placeholder='Home Team'
							onChange={handleNameInputChange}
						/>
						<input
							id='home-team__score-input'
							className='home-team__score'
							name='homeScore'
							placeholder='0'
							value={gameInputs?.homeScore ?? ""}
							onChange={handleScoreInputChange}
						/>
					</div>
					<div> - </div>
					<div className='away-team__wrapper'>
						<input
							id='away-team__name-input'
							className='away-team__name'
							name='awayTeam'
							value={gameInputs?.awayTeam ?? ""}
							placeholder='Away Team'
							onChange={handleNameInputChange}
						/>
						<input
							id='away-team__score-input'
							className='away-team__score'
							name='awayScore'
							placeholder='0'
							value={gameInputs?.awayScore ?? ""}
							onChange={handleScoreInputChange}
						/>
					</div>
				</div>
				<div className='score-board__actions'>
					<button className='new-game__button' onClick={handleNewUpdateGame}>
						New/Update Game
					</button>
				</div>
			</div>
		</>
	);
};

export default ScoreBoardInputs;
