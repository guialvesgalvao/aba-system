import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { AppRoute } from "../nav/nav";
import { NavMenuRoute } from "./nav-menu-route";

import { useLocation } from "react-router-dom";
import { LinkMention } from "../link-mention/link-mention";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { useState } from "react";
import { ModeToggle } from "../theme-button/theme-button";

interface INavMenuProps {
  routes: AppRoute[];
}

export function NavMenu(props: Readonly<INavMenuProps>) {
  const { routes } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const { pathname } = useLocation();

  const isCollapsedMobile = isMobile && isOpen;

  function handleMenuControl(value: boolean): void {
    setIsOpen(value);
  }

  return (
    <Sheet open={isCollapsedMobile} onOpenChange={handleMenuControl}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetTitle>Aba System</SheetTitle>

        <nav className="grid gap-2 text-lg font-medium">
          {routes.map((route) => (
            <NavMenuRoute
              key={route.to}
              currentPath={pathname}
              handleMenuControl={handleMenuControl}
              {...route}
            />
          ))}
        </nav>

        <div>
          <ModeToggle />
        </div>

        <div className="mt-auto text-sm text-center">
          <p>
            Desenvolvido por <br />
            <LinkMention to="https://www.linkedin.com/in/guigalvao/">
              Guilherme Galvão
            </LinkMention>{" "}
            e{" "}
            <LinkMention to="https://www.linkedin.com/in/olucaspedro/">
              Lucas Pedro
            </LinkMention>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
