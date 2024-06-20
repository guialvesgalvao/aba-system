import Home from "./pages/Home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/helpers/use-query-helper";
import { SystemSidebar } from "./pages/system-sidebar";
import { ProductsDashboard } from "./pages/products-dashboard";
import { AppRoute } from "./components/nav/nav";
import { Package, Home as HomeIcon } from "lucide-react";

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
];

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SystemSidebar routes={SYSTEM_ROUTES} />

        <div className="w-full h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsDashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
