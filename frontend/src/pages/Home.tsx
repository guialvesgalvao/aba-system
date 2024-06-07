import { Button } from "@/components/ui/button";

function Home() {
  function handleClick() {
    alert("Clicou no botão");
  }

  return (
    <div>
      <h1>Home</h1>
      <Button type="button" onClick={handleClick}>
        Clica aqui para testar
      </Button>
    </div>
  );
}

export default Home;
