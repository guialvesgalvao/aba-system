import Home from "./pages/home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/helpers/use-query-helper";
import { SystemSidebar } from "./pages/system-sidebar";
import { ProductsDashboard } from "./pages/products-dashboard";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SystemSidebar />

        <div className="h-screen flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsDashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
