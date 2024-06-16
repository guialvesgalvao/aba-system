import { describe, expect, it } from "vitest";

import { render, screen } from "@testing-library/react";
import { CreateQueryProviderWrapper } from "@/shared/helpers/testing-helper";
import { ProductsActive } from "./products-active";

describe("products-active", () => {
  it("should render Products Active successfully", () => {
    render(
      <CreateQueryProviderWrapper>
        <ProductsActive />
      </CreateQueryProviderWrapper>
    );
    screen.debug();
  });

  it("should render Products Active with loading spinner", () => {
    render(
      <CreateQueryProviderWrapper>
        <ProductsActive />
      </CreateQueryProviderWrapper>
    );

    expect(screen.getByText("Buscando produtos ativos"));
  });
});
