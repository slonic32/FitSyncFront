import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from 'react-router-dom';
import { thunk } from 'redux-thunk';

import TrackerPage from "./TrackerPage";

jest.mock('../../components/WaterMainInfo/WaterMainInfo', () => {
  return {
    __esModule: true,
    default: () => <div>MockWaterMainInfo</div>,
  };
});

jest.mock('../../components/WaterDetailedInfo/WaterDetailedInfo', () => {
  return {
    __esModule: true,
    default: () => <div>MockWaterDetailedInfo</div>,
  };
});

jest.mock('../../utils/gemini', () => ({
  analyzeMealWithImage: jest.fn(),
  chatHealthGuide: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("TrackerPage", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {
          name: 'TestUser',
          dailyWaterNorm: 2000
        }
      },
      water: {
        day: "2025-10-26",
        month: "October",
        dayWater: []
      },
    });

    jest.clearAllMocks();
  });

  test("renders TrackerPage content", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <TrackerPage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("MockWaterMainInfo")).toBeInTheDocument();
    expect(screen.getByText("MockWaterDetailedInfo")).toBeInTheDocument();

    const actions = store.getActions();

    expect(actions.length).toBe(2);

    expect(typeof actions[0]).toBe('object');
    expect(actions[0].type).toBe('water/chooseDay/pending');

    expect(typeof actions[1]).toBe('object');
    expect(actions[1].type).toBe('water/chooseMonth/pending');
  });
});