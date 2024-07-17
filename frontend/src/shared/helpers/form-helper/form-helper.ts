type FormWindowParams = {
  id?: number;
  mode: "new" | "edit";
  form: string;
};

export function setFormIDOnParam(params: FormWindowParams) {
  const { id, mode, form } = params;
}
