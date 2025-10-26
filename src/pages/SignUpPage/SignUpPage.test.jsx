import { render, screen } from "@testing-library/react";
import SignUpPage from "./SignUpPage";

jest.mock("../../components/SignUpForm/SignUpForm", () => () => <div>Mocked SignUpForm</div>);
jest.mock("../../components/AdvantagesSection/AdvantagesSection", () => () => <div>Mocked AdvantagesSection</div>);

test("renders SignUpForm and AdvantagesSection components", () => {
  render(<SignUpPage />);

  expect(screen.getByText("Mocked SignUpForm")).toBeInTheDocument();
  expect(screen.getByText("Mocked AdvantagesSection")).toBeInTheDocument();
});
