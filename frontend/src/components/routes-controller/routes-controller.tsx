import { Route, Routes } from "react-router-dom";
import { SystemRoutes } from "../../shared/enums/app";

import { Home } from "../../pages/home";
import { DeliveryPersonsDashboard } from "../../pages/delivery-persons-dashboard";
import { NotFound } from "../../pages/not-found";
import { OriginsDashboard } from "../../pages/origins-dashboard";
import { ProductsDashboard } from "../../pages/products-dashboard";
import { SuppliersDashboard } from "../../pages/suppliers-dashboard";

import { RepeaterTeste } from "@/pages/RepeaterTeste";

export function RoutesController() {
  return (
    <Routes>
      <Route path={SystemRoutes.ALL} element={<NotFound />} />
      <Route path={SystemRoutes.HOME} element={<Home />} />
      <Route path={SystemRoutes.PRODUCTS} element={<ProductsDashboard />} />
      <Route path={SystemRoutes.ORIGINS} element={<OriginsDashboard />} />
      <Route
        path={SystemRoutes.DELIVERYPERSONS}
        element={<DeliveryPersonsDashboard />}
      />
      <Route path={SystemRoutes.SUPPLIERS} element={<SuppliersDashboard />} />

      <Route path="/teste" element={<RepeaterTeste />} />
    </Routes>
  );
}
