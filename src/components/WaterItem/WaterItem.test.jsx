import { render, screen } from "@testing-library/react";
import WaterItem from "./WaterItem";

jest.mock("../AddWaterBtn/AddWaterBtn", () => ({ id, ml }) => (
  <button>{`AddWaterBtn ${ml}ml`}</button>
));
jest.mock("../AddDeleteBtn/AddDeleteBtn", () => ({ id }) => (
  <button>{`AddDeleteBtn ${id}`}</button>
));

describe("WaterItem", () => {
  test("renders ml, time and child buttons", () => {
    const props = { myKey: "123", countMl: 250, currentTime: "08:00" };
    render(<WaterItem {...props} />);

    expect(screen.getByText("250 ml")).toBeInTheDocument();
    expect(screen.getByText("08:00")).toBeInTheDocument();

    expect(screen.getByText("AddWaterBtn 250ml")).toBeInTheDocument();
    expect(screen.getByText("AddDeleteBtn 123")).toBeInTheDocument();
  });
});
