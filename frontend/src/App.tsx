import Home from "./pages/home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/helpers/use-query-helper";
import { SystemSidebar } from "./pages/system-sidebar";
import { ProductsDashboard } from "./pages/products-dashboard";
import { AppRoute } from "./components/nav/nav";
import { Package, Home as HomeIcon } from "lucide-react";

export default function App() {
  const APP_ROUTES: AppRoute[] = [
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

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SystemSidebar routes={APP_ROUTES} />

        <div className="w-full h-screen flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsDashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
