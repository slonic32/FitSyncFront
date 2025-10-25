import { render, screen } from "@testing-library/react";
import ErrorPage from "./ErrorPage";

test("renders 404 error page text", () => {
  render(<ErrorPage />);
  const headingElement = screen.getByText(/Page not found 404/i);
  expect(headingElement).toBeInTheDocument();
});
