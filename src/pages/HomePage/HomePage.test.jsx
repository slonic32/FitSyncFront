import { render, screen } from "@testing-library/react";

import HomePage from "./HomePage";

jest.mock("../../components/WelcomeSection/WelcomeSection", () => () => (
  <div>WelcomeSection</div>
));
jest.mock("../../components/AdvantagesSection/AdvantagesSection", () => () => (
  <div>AdvantagesSection</div>
));

test("renders HomePage with child components", () => {
  render(<HomePage />);

  expect(screen.getByText("WelcomeSection")).toBeInTheDocument();
  expect(screen.getByText("AdvantagesSection")).toBeInTheDocument();
});
