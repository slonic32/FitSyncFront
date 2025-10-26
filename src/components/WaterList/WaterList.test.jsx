import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import WaterList from "./WaterList";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("../WaterItem/WaterItem", () => ({ myKey, countMl, currentTime }) => (
  <li>{`WaterItem ${countMl}ml at ${currentTime}`}</li>
));

describe("WaterList", () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => {
      switch (selector) {
        case require("../../redux/water/selectors").selectDayWater:
          return [
            { _id: "1", value: 250, time: "08:00" },
            { _id: "2", value: 300, time: "12:00" },
          ];
        default:
          return [];
      }
    });
  });

  test("renders WaterList with items", () => {
    render(<WaterList />);

    expect(screen.getByText("WaterItem 250ml at 08:00")).toBeInTheDocument();
    expect(screen.getByText("WaterItem 300ml at 12:00")).toBeInTheDocument();
  });

  test("renders empty list item when dayWater is empty", () => {
    useSelector.mockImplementation(() => []);

    const { container } = render(<WaterList />);
    const li = container.querySelector("li");
    expect(li).toBeInTheDocument();
  });
});
