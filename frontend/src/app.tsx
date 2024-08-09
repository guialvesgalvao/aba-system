import { SystemSidebar } from "./pages/system-sidebar";

import { AppCollapsedWrapper } from "./components/app-collapsed-wrapper/app-collapsed-wrapper";

import { SYSTEM_ROUTES } from "./shared/constants";
import { CustomersDashboard } from "./pages/customers-dashboard";

import { RoutesController } from "./components/routes-controller/routes-controller";
import { ProvidersWrapper } from "./components/providers-wrapper/providers-wrapper";

export default function App() {
  return (
    <ProvidersWrapper>
      <div className="w-full flex flex-col md:flex-row">
        <SystemSidebar routes={SYSTEM_ROUTES} />
        <AppCollapsedWrapper>
          <RoutesController />
        </AppCollapsedWrapper>
      </div>
    </ProvidersWrapper>
  );
}
