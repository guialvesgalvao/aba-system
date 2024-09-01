import { TitlePage } from "@/components/title-page/title-page";
import { OrdersForm } from "@/components/orders/orders-form/orders-form";

export function OrdersNewForm() {
  return (
    <>
      <header className="flex justify-between flex-wrap gap-2">
        <TitlePage title="Pedido" subtitle="Criar um novo pedido" />
      </header>

      <main className="flex flex-1 flex-col gap-2 md:gap-4">
        <OrdersForm />
      </main>
    </>
  );
}
