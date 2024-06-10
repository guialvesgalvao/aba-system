import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SystemSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Button variant={"secondary"} className="w-6 h-6 rounded-full">
          <Package />
        </Button>
      </nav>
    </aside>
  );
}
