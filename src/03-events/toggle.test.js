/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Toggle from "./toggle";

// For each test, we want to render our React tree to a DOM element in a document.
// When the test ends, we want to "clean up" and unmount the tree from the document.
// By unmounting after each test we avoid "leaky" tests.
let container = null;
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {}); // Ignore this line, it's because of React 18.
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("toggles value when clicked", () => {
  // act() makes sure all updates have been processed and applied to the DOM before any assertions
  act(() => {
    render(<Toggle />, container);
  });

  const button = document.querySelector("[data-testid=toggle]");
  expect(button.innerHTML).toBe("off");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(button.innerHTML).toBe("on");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(button.innerHTML).toBe("off");
});
