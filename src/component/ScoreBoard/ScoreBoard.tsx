import React from "react";
import "./ScoreBoardStyle.scss";

export interface Game {
  homeTeam: string;
  homeScore: string;
  awayTeam: string;
  awayScore: string;
}

const ScoreBoard: React.FC<Game> = (game: Game) => {
  const [games, setGames] = React.useState<Game[]>([]);

  React.useEffect(() => {
    setGames((g) => {
      const gameDuplicate = g?.some(
        (g) =>
          g.homeTeam === game.homeTeam &&
          g.awayTeam === game.awayTeam &&
          g.homeScore === game.homeScore &&
          g.awayScore === game.awayScore
      );

      if (g && !gameDuplicate) {
        return [...g, game];
      }

      return g;
    });
  }, [game]);

  return (
    <div className="scores-wrapper">
      {games.map((game, i) => {
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
