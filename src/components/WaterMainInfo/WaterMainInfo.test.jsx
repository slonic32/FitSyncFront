import { render, screen } from "@testing-library/react";
import WaterMainInfo from "./WaterMainInfo";

jest.mock("../Logo/Logo", () => () => <div>Mocked Logo</div>);
jest.mock("../WaterDailyNorma/WaterDailyNorma", () => () => <div>Mocked DailyNorma</div>);
jest.mock("../WaterProgressBar/WaterProgressBar", () => () => <div>Mocked ProgressBar</div>);
jest.mock("../AddWaterBtnBig/AddWaterBtnBig", () => () => <div>Mocked AddWaterBtnBig</div>);

describe("WaterMainInfo", () => {
  test("renders main wrapper and child components", () => {
    const { container } = render(<WaterMainInfo />);

    const wrapper = container.querySelector("div");
    expect(wrapper).toBeTruthy();

    expect(screen.getByText("Mocked Logo")).toBeInTheDocument();
    expect(screen.getByText("Mocked DailyNorma")).toBeInTheDocument();
    expect(screen.getByText("Mocked ProgressBar")).toBeInTheDocument();
    expect(screen.getByText("Mocked AddWaterBtnBig")).toBeInTheDocument();
  });
});
