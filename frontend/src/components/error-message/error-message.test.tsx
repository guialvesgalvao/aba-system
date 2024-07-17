import { describe, expect, it } from "vitest";
import { ErrorMessage } from "./error-message";
import { render, screen } from "@testing-library/react";

describe("ErrorMessage", () => {
  it("should render error message", async () => {
    render(<ErrorMessage error={new Error("Error message")} />);
    expect(screen.getByText("Error message")).toBeTruthy();
  });

  it("should render default message when error is null", async () => {
    render(<ErrorMessage error={null} />);
    expect(screen.getByText("Erro desconhecido")).toBeTruthy();
  });
});
