import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import WaterProgressBar from "./WaterProgressBar";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("../../utils/dates", () => ({
  DayToString: (date) => "2025-10-26",
  DateToStr: (date) => "Oct 26",
}));

describe("WaterProgressBar", () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => {
      switch (selector) {
        case require("../../redux/water/selectors").selectDayWater:
          return [{ value: 500 }, { value: 300 }];
        case require("../../redux/water/selectors").selectWaterLoading:
          return false;
        case require("../../redux/water/selectors").selectDay:
          return "2025-10-26";
        case require("../../redux/auth/selectors").selectUser:
          return { dailyWaterNorm: 2000 };
        default:
          return undefined;
      }
    });
  });

  test("renders progress bar and day label", () => {
    const { container } = render(<WaterProgressBar />);

    const progressContainer = container.querySelector("div");
    expect(progressContainer).toBeTruthy();

    expect(screen.getByText(/Today/i)).toBeInTheDocument();

    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });
});
