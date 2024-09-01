import { TitlePage } from "@/components/title-page/title-page";
import { OrdersForm } from "@/components/orders/orders-form/orders-form";
import { Link } from "react-router-dom";
import { SystemRoutes } from "@/shared/enums/app";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

export function OrdersNewForm() {
  return (
    <>
      <header className="flex justify-between gap-2 flex-wrap">
        <TitlePage title="Pedidos" subtitle="Criar um novo pedido" />

        <Link className="w-auto" to={SystemRoutes.ORDERS}>
          <Button
            className="w-auto gap-2"
            type="button"
            variant="outline"
          >
            <MoveLeft className="w-5 h-5" />
            Voltar para pedidos
          </Button>
        </Link>
      </header>

      <main className="flex flex-1 flex-col pt-4 gap-2 md:gap-4">
        <OrdersForm />
      </main>
    </>
  );
}
