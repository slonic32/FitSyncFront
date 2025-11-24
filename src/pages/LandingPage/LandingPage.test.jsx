import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "./LandingPage";

jest.mock("../../components/Landing/Landing", () => () => <div>Landing</div>);
jest.mock("../../components/Footer/Footer", () => () => <div>Footer</div>);

test("renders HomePage with child components", () => {
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

  expect(screen.getByText("Landing")).toBeInTheDocument();
  expect(screen.getByText("Footer")).toBeInTheDocument();
});
