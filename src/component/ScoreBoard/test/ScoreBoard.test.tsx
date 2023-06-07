import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../../App";
import { expectedGamesOrder, gamesOrderToEnter } from "./ScoreBoardTestData";

describe("ScoreBoard", () => {
	it("Checks if new game is rendered correctly", () => {
		const { container, getByText } = render(<App />);
		// Enter new game values
		const homeTeamInput = container.querySelector("#home-team__name-input");
		const homeScoreInput = container.querySelector("#home-team__score-input");
		const awayScoreInput = container.querySelector("#away-team__score-input");
		const awayTeamInput = container.querySelector("#away-team__name-input");

		if (homeTeamInput) fireEvent.change(homeTeamInput, { target: { value: "New Home Team" } });
		if (homeScoreInput) fireEvent.change(homeScoreInput, { target: { value: "15" } });
		if (awayScoreInput) fireEvent.change(awayScoreInput, { target: { value: "10" } });
		if (awayTeamInput) fireEvent.change(awayTeamInput, { target: { value: "New Away Team" } });

		// Click the "New Game" button
		const newGameButton = getByText("New/Update Game");
		fireEvent.click(newGameButton);

		const homeTeamName = container.querySelector("#home-team__name");
		const homeTeamScore = container.querySelector("#home-team__score");
		const awayTeamScore = container.querySelector("#away-team__score");
		const awayTeamName = container.querySelector("#away-team__name");

		expect(homeTeamName).toHaveTextContent("New Home Team");
		expect(homeTeamScore).toHaveTextContent("0");
		expect(awayTeamScore).toHaveTextContent("0");
		expect(awayTeamName).toHaveTextContent("New Away Team");
	});

	it("updates the ScoreBoard with new game values", () => {
		const { getByText, container } = render(<App />);

		// Enter new game values
		const homeTeamInput = container.querySelector("#home-team__name-input");
		const homeScoreInput = container.querySelector("#home-team__score-input");
		const awayScoreInput = container.querySelector("#away-team__score-input");
		const awayTeamInput = container.querySelector("#away-team__name-input");

		for (let i = 0; i < 2; i++) {
			if (homeTeamInput) fireEvent.change(homeTeamInput, { target: { value: "New Home Team" } });
			if (homeScoreInput) fireEvent.change(homeScoreInput, { target: { value: "15" } });
			if (awayScoreInput) fireEvent.change(awayScoreInput, { target: { value: "10" } });
			if (awayTeamInput) fireEvent.change(awayTeamInput, { target: { value: "New Away Team" } });

			// Click the "New Game" button
			const newGameButton = getByText("New/Update Game");
			fireEvent.click(newGameButton);
		}

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

		for (let i = 0; i < 2; i++) {
			gamesOrderToEnter.forEach((game) => {
				if (homeTeamInput) fireEvent.change(homeTeamInput, { target: { value: game.homeTeam } });
				if (homeScoreInput) fireEvent.change(homeScoreInput, { target: { value: game.homeScore } });
				if (awayScoreInput) fireEvent.change(awayScoreInput, { target: { value: game.awayScore } });
				if (awayTeamInput) fireEvent.change(awayTeamInput, { target: { value: game.awayTeam } });

				// Click the "New Game" button
				const newGameButton = getByText("New/Update Game");
				fireEvent.click(newGameButton);
			});
		}

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

	it("deletes a game from the ScoreBoard", () => {
		const { getByText, container, queryByText } = render(<App />);

		// Enter new game values
		const homeTeamInput = container.querySelector("#home-team__name-input");
		const awayTeamInput = container.querySelector("#away-team__name-input");

		// Enter a game to be deleted
		if (homeTeamInput) fireEvent.change(homeTeamInput, { target: { value: "Team A" } });
		if (awayTeamInput) fireEvent.change(awayTeamInput, { target: { value: "Team B" } });

		// Click the "New Game" button
		const newGameButton = getByText("New/Update Game");
		fireEvent.click(newGameButton);

		// Find and click the delete button for the added game
		const deleteButton = getByText("Finish");
		fireEvent.click(deleteButton);

		// Verify that the deleted game is not displayed in the scoreboard
		expect(queryByText("Team A")).not.toBeInTheDocument();
		expect(queryByText("Team B")).not.toBeInTheDocument();
	});
});
