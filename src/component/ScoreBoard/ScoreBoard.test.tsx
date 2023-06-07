import { fireEvent, render } from "@testing-library/react";
import ScoreBoard from "./ScoreBoard";
import "@testing-library/jest-dom";
import App from "../../App";
import {
  expectedGamesOrder,
  gamesOrderToEnter,
  newGame,
} from "../../utils/testData";

describe("ScoreBoard", () => {
  it("renders the game correctly", () => {
    const game = newGame;

    const { getByText } = render(<ScoreBoard {...game} />);

    const homeTeamName = getByText(game.homeTeam);
    const homeTeamScore = getByText(game.homeScore);
    const awayTeamScore = getByText(game.awayScore);
    const awayTeamName = getByText(game.awayTeam);

    expect(homeTeamName).toBeInTheDocument();
    expect(homeTeamScore).toBeInTheDocument();
    expect(awayTeamScore).toBeInTheDocument();
    expect(awayTeamName).toBeInTheDocument();
  });

  it("updates the ScoreBoard with new game values", () => {
    const { getByText, container } = render(<App />);

    // Enter new game values
    const homeTeamInput = container.querySelector("#home-team__name-input");
    const homeScoreInput = container.querySelector("#home-team__score-input");
    const awayScoreInput = container.querySelector("#away-team__score-input");
    const awayTeamInput = container.querySelector("#away-team__name-input");

    if (homeTeamInput)
      fireEvent.change(homeTeamInput, { target: { value: "New Home Team" } });
    if (homeScoreInput)
      fireEvent.change(homeScoreInput, { target: { value: "15" } });
    if (awayScoreInput)
      fireEvent.change(awayScoreInput, { target: { value: "10" } });
    if (awayTeamInput)
      fireEvent.change(awayTeamInput, { target: { value: "New Away Team" } });

    // Click the "New Game" button
    const newGameButton = getByText("New Game");
    fireEvent.click(newGameButton);

    // Check if the updated game values are rendered in the ScoreBoard
    const homeTeamName = getByText("New Home Team");
    const homeTeamScore = getByText("15");
    const awayTeamScore = getByText("10");
    const awayTeamName = getByText("New Away Team");

    expect(homeTeamName).toBeInTheDocument();
    expect(homeTeamScore).toBeInTheDocument();
    expect(awayTeamScore).toBeInTheDocument();
    expect(awayTeamName).toBeInTheDocument();
  });

  it("checks the order of the list displayed", () => {
    const { getByText, container } = render(<App />);

    // Enter new game values
    const homeTeamInput = container.querySelector("#home-team__name-input");
    const homeScoreInput = container.querySelector("#home-team__score-input");
    const awayScoreInput = container.querySelector("#away-team__score-input");
    const awayTeamInput = container.querySelector("#away-team__name-input");

    gamesOrderToEnter.forEach((game) => {
      if (homeTeamInput)
        fireEvent.change(homeTeamInput, { target: { value: game.homeTeam } });
      if (homeScoreInput)
        fireEvent.change(homeScoreInput, { target: { value: game.homeScore } });
      if (awayScoreInput)
        fireEvent.change(awayScoreInput, { target: { value: game.awayScore } });
      if (awayTeamInput)
        fireEvent.change(awayTeamInput, { target: { value: game.awayTeam } });

      // Click the "New Game" button
      const newGameButton = getByText("New Game");
      fireEvent.click(newGameButton);
    });

    const scores = container.querySelector("#scores-wrapper");

    scores?.childNodes.forEach((child, index) => {
      expectedGamesOrder.forEach((game, gameIndex) => {
        if (index === gameIndex) {
          expect(child).toHaveTextContent(game.homeTeam);
          expect(child).toHaveTextContent(game.homeScore);
          expect(child).toHaveTextContent(game.awayScore);
          expect(child).toHaveTextContent(game.awayTeam);
        }
      });
    });
  });
});
