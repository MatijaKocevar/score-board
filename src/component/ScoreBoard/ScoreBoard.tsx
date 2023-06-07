import React, { useEffect, useState } from "react";
import "./ScoreBoardStyle.scss";
import { sortGames } from "../../utils/utils";

export interface Game {
	homeTeam?: string;
	homeScore?: string;
	awayTeam?: string;
	awayScore?: string;
	createdAt?: Date;
}

const ScoreBoard: React.FC<Game> = (game: Game) => {
	const [games, setGames] = useState<Game[]>();

	useEffect(() => {
		const isMissingProp = game.awayTeam === "" || game.awayTeam === undefined || game.homeTeam === "" || game.homeTeam === undefined;
		const gameExists = games?.some((gamePrev) => gamePrev.homeTeam === game.homeTeam && gamePrev.awayTeam === game.awayTeam);
		const isMissingHomeTeam = game.homeTeam === "" || game.homeTeam === undefined;
		const isMissingAwayTeam = game.awayTeam === "" || game.awayTeam === undefined;

		if (isMissingProp) {
			if (isMissingAwayTeam && !isMissingHomeTeam) alert(`Missing team name: "Away"`);
			if (isMissingHomeTeam && !isMissingAwayTeam) alert(`Missing team name: "Home"`);

			return;
		}

		if (gameExists) {
			setGames((g) => {
				const gameToUpdate = g?.find((gamePrev) => gamePrev.homeTeam === game.homeTeam && gamePrev.awayTeam === game.awayTeam);

				if (gameToUpdate) {
					gameToUpdate.awayScore = game.awayScore ?? "0";
					gameToUpdate.homeScore = game.homeScore ?? "0";

					if (g?.length) {
						const newGames = [...g];
						const sortedGames = sortGames(newGames);

						return sortedGames;
					}
				}
			});
		} else
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
				} else return [newGame];
			});
		// i don't want to react to games array changes
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game]);

	return (
		<div id='scores-wrapper' className='scores-wrapper'>
			{games?.map((game, i) => {
				return (
					<div id={"game" + i} className='game' key={"game" + i}>
						<div id='home-team__name' className='home-team__name'>
							{game.homeTeam}
						</div>
						<div id='home-team__score' className='home-team__score'>
							{game.homeScore}
						</div>
						<div> - </div>
						<div id='away-team__score' className='away-team__score'>
							{game.awayScore}
						</div>
						<div id='away-team__name' className='away-team__name'>
							{game.awayTeam}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ScoreBoard;
