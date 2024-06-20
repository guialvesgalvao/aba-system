import { Button } from "@/components/ui/button";
import { SystemRoutes } from "@/shared/enums/app";
import { SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  function handleRedirectToHome() {
    navigate(SystemRoutes.HOME);
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="text-center flex flex-col items-center gap-8">
        <div>
          <SearchX className="w-32 h-32" />
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="text-3xl">Página não encontrada</h2>
          <p>
            Não foi possivel encontrar a página solicitada.
            <br /> Caso problema persista entre em contato com o Administrador
          </p>
        </section>

        <Button type="button" variant="default" onClick={handleRedirectToHome}>
          Voltar para página inicial
        </Button>
      </div>
    </div>
  );
}
