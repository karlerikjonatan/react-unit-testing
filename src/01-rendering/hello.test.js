/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Hello from "./hello";

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

it("renders with or without a name", () => {
  // act() makes sure all updates have been processed and applied to the DOM before any assertions
  act(() => {
    render(<Hello />, container);
  });
  expect(container.textContent).toBe("Hey, stranger");

  act(() => {
    render(<Hello name="Jonatan" />, container);
  });
  expect(container.textContent).toBe("Hello, Jonatan!");
});
