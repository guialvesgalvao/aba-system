import { ToolbarContent } from "./toolbar-content";

export function ToolbarMenu() {
  return (
    <div className="bg-toolbar h-8 fixed bottom-[4%] rounded-full -translate-x-2/4 -translate-y-2/4 left-2/4 z-50 border shadow p-2">
      <ToolbarContent />
    </div>
  );
}
