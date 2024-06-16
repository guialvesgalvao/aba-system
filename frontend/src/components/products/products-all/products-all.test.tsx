import { describe, expect, it } from "vitest";

import { ProductsAll } from "./products-all";
import { render, screen } from "@testing-library/react";
import { CreateQueryProviderWrapper } from "@/shared/helpers/testing-helper";

describe("products-all", () => {
  it("should render Products All successfully", () => {
    render(
      <CreateQueryProviderWrapper>
        <ProductsAll />
      </CreateQueryProviderWrapper>
    );
    screen.debug();
  });

  it("should render Products All with loading spinner", () => {
    render(
      <CreateQueryProviderWrapper>
        <ProductsAll />
      </CreateQueryProviderWrapper>
    );

    expect(screen.getByText("Buscando todos produtos"));
  });
});
