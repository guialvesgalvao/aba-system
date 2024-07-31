import Home from "./pages/home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/helpers/use-query-helper";
import { SystemSidebar } from "./pages/system-sidebar";
import { ProductsDashboard } from "./pages/products-dashboard";

import { NotFound } from "./pages/not-found";
import { SystemRoutes } from "./shared/enums/app";
import { AppCollapsedWrapper } from "./components/app-collapsed-wrapper/app-collapsed-wrapper";
import { OriginsDashboard } from "./pages/origins-dashboard";
import { DeliveryPersonsDashboard } from "./pages/delivery-persons-dashboard";
import { SuppliersDashboard } from "./pages/suppliers-dashboard";

import { SYSTEM_ROUTES } from "./shared/constants";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="w-full flex flex-col md:flex-row">
          <SystemSidebar routes={SYSTEM_ROUTES} />

          <AppCollapsedWrapper>
            <Routes>
              <Route path={SystemRoutes.ALL} element={<NotFound />} />
              <Route path={SystemRoutes.HOME} element={<Home />} />
              <Route
                path={SystemRoutes.PRODUCTS}
                element={<ProductsDashboard />}
              />
              <Route
                path={SystemRoutes.ORIGINS}
                element={<OriginsDashboard />}
              />
              <Route
                path={SystemRoutes.DELIVERYPERSONS}
                element={<DeliveryPersonsDashboard />}
              />
              <Route
                path={SystemRoutes.SUPPLIERS}
                element={<SuppliersDashboard />}
              />
            </Routes>
          </AppCollapsedWrapper>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
