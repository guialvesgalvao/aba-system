import { Supplier } from "@/shared/factories/suppliers-factory";

import SuppliersService from "@/shared/services/suppliers-service";
import { SupplierProductsStaticTable } from "../../suppliers-products/suppliers-table/suppliers-products-static-table";
import { ComponentRequest } from "@/components/component-request/component-request";

interface ISuppliersProductsProps {
  supplier: Supplier;
}

export function SuppliersProducts(props: Readonly<ISuppliersProductsProps>) {
  const { supplier } = props;

  async function getSupplierProducts() {
    const service = new SuppliersService();
    const supplierWithProducts = await service.getSupplierExtendedData(
      supplier
    );

    return supplierWithProducts.supplier_products;
  }

  return (
    <ComponentRequest
      storages={["supplier-products", supplier.id.toString()]}
      component={SupplierProductsStaticTable}
      request={() => getSupplierProducts()}
    />
  );
}
