import { describe, expect, it } from "vitest";
import { LoadingSpinner } from "./loading-spinner";
import { render } from "@testing-library/react";

describe("loading-spinner", () => {
  it("should render LoadingSpinner successfully", () => {
    render(<LoadingSpinner text="LoadingSpinner" />);
  });

  it("should render LoadingSpinner with custom class", () => {
    render(<LoadingSpinner text="LoadingSpinner" className="custom-class" />);

    expect(document.querySelector(".custom-class")).toBeTruthy();
  });

  it("should render LoadingSpinner with custom text", () => {
    const text = "Custom text";

    const component = render(<LoadingSpinner text={text} />);

    expect(component.queryByText(text)).toBeTruthy();
  });
});
