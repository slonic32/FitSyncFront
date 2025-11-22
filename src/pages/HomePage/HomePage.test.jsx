import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

jest.mock('../../components/LandingPage/LandingPage', () => () => <div>LandingPage</div>);
jest.mock('../../components/Footer/Footer', () => () => <div>Footer</div>);

test("renders HomePage with child components", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  expect(screen.getByText("LandingPage")).toBeInTheDocument();
  expect(screen.getByText("Footer")).toBeInTheDocument();
});
