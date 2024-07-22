import { ProductResponse } from "@/shared/types/products-types";
import { SupplierProductResponse } from "@/shared/types/suppliers-products-types";
import {
  SupplierIntregratedResponse,
  SupplierResponse,
} from "@/shared/types/suppliers-types";

export function aggregateSuppliersData(
  suppliers: SupplierResponse[],
  supplierProducts: SupplierProductResponse[],
  products: ProductResponse[]
): SupplierIntregratedResponse[] {
  // Mapeia os produtos por id para acesso rápido
  const productMap: Record<number, ProductResponse> = products.reduce(
    (acc, product) => {
      acc[product.id] = product;
      return acc;
    },
    {} as Record<number, ProductResponse>
  );

  // Mapeia os supplier products e inclui os detalhes do produto
  const supplierProductsWithDetails: SupplierProductResponse[] =
    supplierProducts.map((supplierProduct) => ({
      ...supplierProduct,
      product: productMap[supplierProduct.product_id],
    }));

  // Mapeia os suppliers e inclui os supplier products com detalhes
  const suppliersWithProducts: SupplierIntregratedResponse[] = suppliers.map(
    (supplier) => ({
      ...supplier,
      supplier_products: supplierProductsWithDetails.filter(
        (sp) => sp.supplier_id === supplier.id
      ),
    })
  );

  return suppliersWithProducts;
}
