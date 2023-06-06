import { render } from "@testing-library/react";
import ScoreBoard from "./ScoreBoard";
import "@testing-library/jest-dom";

describe("Scoreboard", () => {
  test("should render the initial score as 0-0", () => {
    const rendered = render(
      <ScoreBoard homeTeam="Home" homeScore={0} awayTeam="Away" awayScore={0} />
    );

    const homeTeamName = rendered.container.querySelector("#home-team__name");
    const homeTeamScore = rendered.container.querySelector("#home-team__score");
    const awayTeamName = rendered.container.querySelector("#away-team__name");
    const awayTeamScore = rendered.container.querySelector("#away-team__score");

    expect(homeTeamName).toHaveTextContent("Home");
    expect(homeTeamScore).toHaveTextContent("0");
    expect(awayTeamName).toHaveTextContent("Away");
    expect(awayTeamScore).toHaveTextContent("0");
  });
});
