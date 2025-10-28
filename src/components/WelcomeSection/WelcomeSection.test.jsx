import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WelcomeSection from "./WelcomeSection";

jest.mock("../Logo/Logo", () => () => <div>Mocked Logo</div>);

test("renders WelcomeSection with main content and links", () => {
  render(
    <MemoryRouter>
      <WelcomeSection />
    </MemoryRouter>
  );

  expect(screen.getByText("Mocked Logo")).toBeInTheDocument();

  expect(screen.getByText(/Track your fitness journey/i)).toBeInTheDocument();
  expect(screen.getByText(/Fitness goals tracker/i)).toBeInTheDocument();

  expect(screen.getByText(/Try tracker/i)).toBeInTheDocument();
  expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
});
