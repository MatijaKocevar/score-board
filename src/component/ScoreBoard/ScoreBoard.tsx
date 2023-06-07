import React, { useCallback, useEffect, useState } from "react";
import "./ScoreBoardStyle.scss";
import { expectedGamesOrder, gamesOrderToEnter } from "./test/ScoreBoardTestData";

export interface Game {
	homeTeam?: string;
	homeScore?: string;
	awayTeam?: string;
	awayScore?: string;
	createdAt?: Date;
}

const sortGames = (games: Game[]) => {
	return [...games].sort((a, b) => {
		// Calculate the total score for each game
		const totalScoreA = Number(a.homeScore) + Number(a.awayScore);
		const totalScoreB = Number(b.homeScore) + Number(b.awayScore);

		// Compare the total scores
		if (totalScoreB !== totalScoreA) {
			return totalScoreB - totalScoreA; // Sort by total score in descending order
		}

		// If the total scores are the same, compare the creation dates
		if (a.createdAt && b.createdAt) {
			return b.createdAt.getTime() - a.createdAt.getTime(); // Sort by creation date in descending order
		}

		return 0;
	});
};

const ScoreBoard: React.FC<Game> = (game: Game) => {
	// State to store the list of games
	const [games, setGames] = useState<Game[]>();

	useEffect(() => {
		const gameExists = games?.some((gamePrev) => gamePrev.homeTeam === game.homeTeam && gamePrev.awayTeam === game.awayTeam);
		const isMissingHomeTeam = game.homeTeam === "" || game.homeTeam === undefined;
		const isMissingAwayTeam = game.awayTeam === "" || game.awayTeam === undefined;
		const isMissingAwayScore = game.homeScore === "" || game.homeScore === undefined;
		const isMissingHomeScore = game.awayScore === "" || game.awayScore === undefined;

		if (gameExists) {
			if (!isMissingAwayScore && !isMissingHomeScore) {
				// Update an existing game in the list
				setGames((g) => {
					const gameToUpdate = g?.find((gamePrev) => gamePrev.homeTeam === game.homeTeam && gamePrev.awayTeam === game.awayTeam);

					if (gameToUpdate) {
						gameToUpdate.awayScore = game.awayScore;
						gameToUpdate.homeScore = game.homeScore;

						if (g?.length) {
							const newGames = [...g];
							const sortedGames = sortGames(newGames);

							return sortedGames;
						}
					}
				});
			}
		} else {
			if (!isMissingAwayTeam && !isMissingHomeTeam) {
				// Add a new game to the list
				setGames((g) => {
					const newGame: Game = {
						homeTeam: game.homeTeam,
						homeScore: "0",
						awayTeam: game.awayTeam,
						awayScore: "0",
						createdAt: new Date(),
					};

					if (g?.length) {
						const newGames = [...g, newGame];
						const sortedGames = sortGames(newGames);

						return sortedGames;
					} else {
						return [newGame];
					}
				});
			}
		}
		// I don't want to react to changes in the games array
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game]);

	const handleFinishMatch = useCallback((index: number) => {
		setGames((prevGames) => {
			if (!prevGames?.length) return prevGames;

			const updatedGames = [...prevGames];
			updatedGames.splice(index, 1);

			return updatedGames;
		});
	}, []);

	return (
		<div id='scores-wrapper' className='scores-wrapper'>
			{games?.map((game, i) => {
				return (
					<div className='game-wrapper' key={"game-wrapper" + i}>
						<button className='finish-match__button' onClick={() => handleFinishMatch(i)}>
							Finish
						</button>
						<div id={"game" + i} className='game' key={"game" + i}>
							<div id='home-team__name' className='home-team__name'>
								{game.homeTeam}
							</div>
							<div id='home-team__score' className='home-team__score'>
								{game.homeScore}
							</div>
							<div> - </div>
							<div id='away-team__name' className='away-team__name'>
								{game.awayTeam}
							</div>
							<div id='away-team__score' className='away-team__score'>
								{game.awayScore}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ScoreBoard;
