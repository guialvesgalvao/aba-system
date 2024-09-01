import { SystemSidebar } from "./pages/system-sidebar";

import { AppCollapsedWrapper } from "./components/app-collapsed-wrapper/app-collapsed-wrapper";

import { SYSTEM_ROUTES } from "./shared/constants";

import { RoutesController } from "./components/routes-controller/routes-controller";
import { ProvidersWrapper } from "./components/providers-wrapper/providers-wrapper";
import { AppContentWrapper } from "./components/utilities/app-content-wrapper";
import { useTheme } from "./shared/hooks/use-theme";

export default function App() {
  useTheme();

  return (
    <ProvidersWrapper>
      <div className="w-full flex flex-col md:flex-row relative">
        <SystemSidebar routes={SYSTEM_ROUTES} />

        <AppCollapsedWrapper>
          <AppContentWrapper>
            <RoutesController />
          </AppContentWrapper>
        </AppCollapsedWrapper>
      </div>
    </ProvidersWrapper>
  );
}
