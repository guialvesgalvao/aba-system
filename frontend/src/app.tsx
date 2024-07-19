import Home from "./pages/home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/helpers/use-query-helper";
import { SystemSidebar } from "./pages/system-sidebar";
import { ProductsDashboard } from "./pages/products-dashboard";
import { AppRoute } from "./components/nav/nav";
import { Truck, MapPin, Factory, Package, Home as HomeIcon } from "lucide-react";
import { NotFound } from "./pages/not-found";
import { SystemRoutes } from "./shared/enums/app";
import { AppCollapsedWrapper } from "./components/app-collapsed-wrapper/app-collapsed-wrapper";
import { OriginsDashboard } from "./pages/origins-dashboard";
import { DeliveryPersonsDashboard } from "./pages/delivery-persons-dashboard";
import { SuppliersDashboard } from "./pages/suppliers-dashboard";

const SYSTEM_ROUTES: AppRoute[] = [
  {
    icon: <HomeIcon className="h-4 w-4" />,
    to: "/",
    text: "Início",
    tooltip: "Ir para página inicial",
  },
  {
    icon: <Package className="h-4 w-4" />,
    to: "/products",
    text: "Produtos",
    tooltip: "Ir para páginas de produtos",
  },
  {
    icon: <Factory className="h-4 w-4" />,
    to: "/suppliers",
    text: "Fornecedores",
    tooltip: "Ir para páginas de fornecedores",
  },
  {
    icon: <MapPin className="h-4 w-4" />,
    to: "/origins",
    text: "Origens",
    tooltip: "Ir para páginas de origens",
  },
  {
    icon: <Truck className="h-4 w-4" />,
    to: "/delivery-persons",
    text: "Tipos de Entrega",
    tooltip: "Ir para páginas de tipos de entrega",
  }
];

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="w-full flex">
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
