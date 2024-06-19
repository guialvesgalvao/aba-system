import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CollapseButton } from "./collapse-button";
import { TooltipProvider } from "../ui/tooltip";
import { useSidebar } from "@/shared/hooks/use-sidebar";

describe("collapse-button", () => {
  it("should render CollapseButton successfully", () => {
    render(
      <TooltipProvider>
        <CollapseButton />
      </TooltipProvider>
    );

    screen.debug();
  });

  it("should click in the button and see if collapse", async () => {
    const {
      result: {
        current: { isCollapsed },
      },
    } = renderHook(useSidebar);

    const component = render(
      <TooltipProvider>
        <CollapseButton />
      </TooltipProvider>
    );

    const button = await component.getByRole("button");
    fireEvent.click(button);

    const {
      result: {
        current: { isCollapsed: isCollapsedAfterClick },
      },
    } = renderHook(useSidebar);

    expect(isCollapsedAfterClick).not.toBe(isCollapsed);
  });
});
