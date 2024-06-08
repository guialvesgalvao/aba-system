import FormGenerator from "@/components/generators/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import z from "zod";

const FormValidationSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

type FormSchema = z.infer<typeof FormValidationSchema>;

function Home() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormValidationSchema),
    defaultValues: {},
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <FormGenerator<FormSchema>
        form={form}
        rows={[
          {
            name: "User Information",
            fields: [
              {
                name: "username",
                type: "text",
                label: "Username",
                description: "Enter your username.",
              },
              {
                name: "username",
                type: "text",
                label: "Username",
                description: "Enter your username.",
              },
            ],
          },
          {
            name: "User Information",
            fields: [
              {
                name: "username",
                type: "text",
                label: "Username",
                description: "Enter your username.",
              },
            ],
          },
        ]}
        onSubmit={function (data: unknown): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}

export default Home;
