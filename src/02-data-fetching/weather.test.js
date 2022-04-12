/* eslint-disable testing-library/no-unnecessary-act */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Weather from "./Weather";

// For each test, we want to render our React tree to a DOM element in a document.
// When the test ends, we want to "clean up" and unmount the tree from the document.
// By unmounting after each test we avoid "leaky" tests.
let container = null;
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {}); // Ignore this line, it mutes React 18 warnings.
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders weather data", async () => {
  const weatherData = {
    current_condition: [
      {
        FeelsLikeC: "7",
        weatherDesc: [
          {
            value: "Sunny",
          },
        ],
      },
    ],
  };

  // spyOn() tracks object[methodName], creates and calls a mock function
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(weatherData),
    })
  );

  // act() makes sure all updates have been processed and applied to the DOM before any assertions
  act(() => {
    render(<Weather />, container);
  });
  expect(container.textContent).toBe("No data");

  act(() => {
    render(<Weather city="Stockholm" />, container);
  });
  expect(container.textContent).toBe("Loading...");

  await act(async () => {
    render(<Weather city="Stockholm" />, container);
  });
  expect(container.querySelector(".city").textContent).toBe("Stockholm");
  expect(container.querySelector(".degrees").textContent).toBe(
    weatherData.current_condition[0].FeelsLikeC
  );
  expect(container.querySelector(".description").textContent).toBe(
    weatherData.current_condition[0].weatherDesc[0].value
  );

  // Restores mock function and object[methodName]
  global.fetch.mockRestore();
});
