import { Game } from "../component/ScoreBoard/ScoreBoard";

export const checkAllGamePropsFilled = (game: Game) => {
  const isMissingProp =
    game.awayScore === "" ||
    game.awayScore === undefined ||
    game.awayTeam === "" ||
    game.awayTeam === undefined ||
    game.homeScore === "" ||
    game.homeScore === undefined ||
    game.homeTeam === "" ||
    game.homeTeam === undefined;

  return !isMissingProp;
};

export const sortGames = (games: Game[]) => {
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
