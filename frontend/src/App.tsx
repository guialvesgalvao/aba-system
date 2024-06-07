import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/helpers/use-query-helper";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
