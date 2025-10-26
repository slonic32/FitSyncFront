import { render, screen } from "@testing-library/react";
import SignInPage from "./SignInPage";

jest.mock("../../components/SignInForm/SignInForm", () => () => <div>Mocked SignInForm</div>);
jest.mock("../../components/AdvantagesSection/AdvantagesSection", () => () => <div>Mocked AdvantagesSection</div>);

test("renders SignInForm and AdvantagesSection components", () => {
  render(<SignInPage />);

  expect(screen.getByText("Mocked SignInForm")).toBeInTheDocument();
  expect(screen.getByText("Mocked AdvantagesSection")).toBeInTheDocument();
});
