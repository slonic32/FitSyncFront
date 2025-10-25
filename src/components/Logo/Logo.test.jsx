import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import Logo from "./Logo";

test("renders FITSYNC text", () => {
  render(
    <MemoryRouter>
      <Logo />
    </MemoryRouter>
  );

  const linkElement = screen.getByText(/FITSYNC/i);
  expect(linkElement).toBeInTheDocument();

  expect(linkElement.getAttribute("href")).toBe("/");
});
