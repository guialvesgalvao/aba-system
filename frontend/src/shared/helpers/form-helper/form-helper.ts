type FormWindowParams = {
  id?: number;
  mode: "new" | "edit";
  form: string;
};

export function setFormIDOnParam(params: FormWindowParams) {
  // Revisão Lucas Pedro
  // const { id, mode, form } = params;
  const teste = params;
  console.log(teste, 'pendente de validação')
}
