import { describe, it } from "vitest";

import { render, screen } from "@testing-library/react";
import { CreateQueryProviderWrapper } from "@/shared/helpers/testing-helper";
import { ProductsRequest } from "./products-request";
import { ProductsTable } from "../products-table/products-table";
import {
  getActiveProducts,
  getAllProducts,
} from "@/shared/services/products-service";

describe("products-all", () => {
  it("should render Products All successfully", () => {
    render(
      <CreateQueryProviderWrapper>
        <ProductsRequest
          storages={["products", "all"]}
          request={getAllProducts}
          component={ProductsTable}
        />
      </CreateQueryProviderWrapper>
    );
    screen.debug();
  });

  it("should render Products Active successfully", () => {
    render(
      <CreateQueryProviderWrapper>
        <ProductsRequest
          storages={["products", "active"]}
          request={getActiveProducts}
          component={ProductsTable}
        />
      </CreateQueryProviderWrapper>
    );
    screen.debug();
  });
});
