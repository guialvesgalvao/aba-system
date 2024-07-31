import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { AppRoute } from "../nav/nav";
import { NavMenuRoute } from "./nav-menu-route";

import { useLocation } from "react-router-dom";
import { LinkMention } from "../link-mention/link-mention";

interface INavMenuProps {
  routes: AppRoute[];
}

export function NavMenu(props: Readonly<INavMenuProps>) {
  const { routes } = props;

  const { pathname } = useLocation();

  return (
    <Sheet>
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
        <SheetTitle>Menu</SheetTitle>
        <nav className="grid gap-2 text-lg font-medium">
          {routes.map((route) => (
            <NavMenuRoute key={route.to} currentPath={pathname} {...route} />
          ))}
        </nav>

        <div className="mt-auto text-sm text-center">
          <p>
            Desenvolvido por <br />
            <LinkMention to="https://www.linkedin.com/in/olucaspedro/">
              Guilherme Galvão
            </LinkMention>{" "}
            e{" "}
            <LinkMention to="https://www.linkedin.com/in/guigalvao/">
              Lucas Pedro
            </LinkMention>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
