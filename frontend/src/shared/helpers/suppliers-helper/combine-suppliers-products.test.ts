import { describe, it, expect } from "vitest";
import { aggregateSuppliersData } from "./combine-suppliers-products";
import {
  createProductsMockBasedOnLength,
  createSuppliersMockBasedOnLength,
  createSuppliersProductsMockBasedOnLength,
} from "../../mocks/suppliers-integrated-mocks";
import { SupplierResponse } from "../../types/suppliers-types";
import { SupplierProductResponse } from "../../types/suppliers-products-types";
import { ProductResponse } from "../../types/products-types";

describe("aggregateSuppliersData", () => {
  const suppliers: SupplierResponse[] = createSuppliersMockBasedOnLength(5);

  const supplierProducts: SupplierProductResponse[] =
    createSuppliersProductsMockBasedOnLength(2);

  const products: ProductResponse[] = createProductsMockBasedOnLength(2);

  it("deve agregar corretamente os dados de suppliers, supplier_products e products", async () => {
    const result = await aggregateSuppliersData(
      suppliers,
      supplierProducts,
      products
    );

    expect(result).toEqual([
      {
        ...suppliers[0],
        supplier_products: [
          {
            ...supplierProducts[0],
            product: products[0],
          },
          {
            ...supplierProducts[1],
            product: products[1],
          },
        ],
      },
      {
        ...suppliers[1],
        supplier_products: [
          {
            ...supplierProducts[2],
            product: products[0],
          },
        ],
      },
    ]);
  });

  it("deve retornar um array vazio se não houver suppliers", async () => {
    const result = await aggregateSuppliersData([], supplierProducts, products);
    expect(result).toEqual([]);
  });

  it("deve retornar suppliers sem supplier_products se não houver supplier_products", async () => {
    const result = await aggregateSuppliersData(suppliers, [], products);
    expect(result).toEqual(
      suppliers.map((supplier) => ({ ...supplier, supplier_products: [] }))
    );
  });

  it("deve retornar supplier_products sem produtos se não houver products", async () => {
    const result = await aggregateSuppliersData(
      suppliers,
      supplierProducts,
      []
    );

    const expected = suppliers.map((supplier) => ({
      ...supplier,
      supplier_products: supplierProducts.filter(
        (sp) => sp.supplier_id === supplier.id
      ),
    }));

    expect(result).toEqual(expected);
  });
});
