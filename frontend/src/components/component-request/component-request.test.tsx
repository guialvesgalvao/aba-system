import { describe, expect, it } from "vitest";

import { render, screen } from "@testing-library/react";
import { CreateQueryProviderWrapper } from "@/shared/helpers/testing-helper";
import { ComponentRequest } from "./component-request";
import { ProductsTable } from "../products/products-table/products-table";
import { Product } from "@/shared/factories/products-factory";
import ProductsService from "@/shared/services/products-service";
import { createProductsMockBasedOnLength } from "@/shared/mocks/products-mocks";
import { TooltipProvider } from "../ui/tooltip";
import { BrowserRouter } from "react-router-dom";

describe("component-request-products", () => {
  it("should render Products All successfully", async () => {
    const { getAllProducts } = new ProductsService();

    render(
      <BrowserRouter>
        <CreateQueryProviderWrapper>
          <TooltipProvider>
            <ComponentRequest<Product>
              storages={["products", "all"]}
              request={getAllProducts}
              component={ProductsTable}
            />
          </TooltipProvider>
        </CreateQueryProviderWrapper>
      </BrowserRouter>
    );

    await screen.findByText("ID");
    screen.debug();

    expect(screen.getByText("ID")).toBeTruthy();
  });

  it("should render empty products", async () => {
    render(
      <CreateQueryProviderWrapper>
        <ComponentRequest<Product>
          storages={["products", "all"]}
          request={async () => createProductsMockBasedOnLength(0)}
          component={ProductsTable}
        />
      </CreateQueryProviderWrapper>
    );

    await screen.findByText("Nenhum produto encontrado");
    expect(screen.getByText("Nenhum produto encontrado")).toBeTruthy();
  });

  it("should render error message when request fails", async () => {
    const { getAllProducts } = new ProductsService();

    render(
      <CreateQueryProviderWrapper>
        <ComponentRequest<Product>
          storages={["products", "all"]}
          request={() => {
            throw new Error("Error fetching products");
            return getAllProducts();
          }}
          component={ProductsTable}
        />
      </CreateQueryProviderWrapper>
    );

    await screen.findByText("Error fetching products");
    expect(screen.getByText("Error fetching products")).toBeTruthy();
  });
});
