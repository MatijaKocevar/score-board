import React, { useEffect, useMemo, useState } from "react";
import "./ScoreBoardStyle.scss";
import { sortGames } from "../../utils/utils";
import { expectedGamesOrder } from "../../utils/testData";

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
    const isMissingProp =
      game.awayTeam === "" ||
      game.awayTeam === undefined ||
      game.homeTeam === "" ||
      game.homeTeam === undefined;

    const isGameDuplicate = games?.some(
      (gamePrev) =>
        gamePrev.homeTeam === game.homeTeam &&
        gamePrev.awayTeam === game.awayTeam
    );

    if (isGameDuplicate) {
      alert("Game already exists");
    } else if (!isMissingProp) {
      setGames((g) => {
        if (g) {
          const newGame: Game = {
            homeTeam: game.homeTeam,
            homeScore: game.homeScore ?? "0",
            awayTeam: game.awayTeam,
            awayScore: game.awayScore ?? "0",
            createdAt: new Date(),
          };

          const newGames = [...g, newGame];
          const sortedGames = sortGames(newGames);

          return sortedGames;
        } else {
          return [game];
        }
      });
    } else {
      const isMissingHomeTeam =
        game.homeTeam === "" || game.homeTeam === undefined;
      const isMissingAwayTeam =
        game.awayTeam === "" || game.awayTeam === undefined;

      if (isMissingAwayTeam && !isMissingHomeTeam)
        alert(`Missing team name: "Away"`);

      if (isMissingHomeTeam && !isMissingAwayTeam)
        alert(`Missing team name: "Home"`);
    }
  }, [game]);

  return (
    <div id="scores-wrapper" className="scores-wrapper">
      {games?.map((game, i) => {
        return (
          <div id={"game" + i} className="game" key={"game" + i}>
            <div id="home-team__name" className="home-team__name">
              {game.homeTeam}
            </div>
            <div id="home-team__score" className="home-team__score">
              {game.homeScore}
            </div>
            <div> - </div>
            <div id="away-team__score" className="away-team__score">
              {game.awayScore}
            </div>
            <div id="away-team__name" className="away-team__name">
              {game.awayTeam}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScoreBoard;
