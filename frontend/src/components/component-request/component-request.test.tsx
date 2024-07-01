import { describe, it } from "vitest";

import { render, screen } from "@testing-library/react";
import { CreateQueryProviderWrapper } from "@/shared/helpers/testing-helper";
import { ComponentRequest } from "./component-request";
import { ProductsTable } from "../products/products-table/products-table";
import { Product } from "@/shared/factories/products-factory";
import ProductsService from "@/shared/services/products-service";

describe("component-request-products", () => {
  it("should render Products All successfully", () => {
    const { getProducts } = new ProductsService();

    render(
      <CreateQueryProviderWrapper>
        <ComponentRequest<Product>
          storages={["products", "all"]}
          request={getProducts}
          component={ProductsTable}
        />
      </CreateQueryProviderWrapper>
    );
    screen.debug();
  });
});
