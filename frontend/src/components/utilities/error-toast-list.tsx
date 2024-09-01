interface IErrorToastListProps {
  errors: string[];
}

export function ErrorToastList(props: Readonly<IErrorToastListProps>) {
  const { errors } = props;

  return (
    <ul className="flex flex-col pl-4 gap-1">
      {errors.map((error) => (
        <li className="list-disc" key={error}>
          {error}
        </li>
      ))}
    </ul>
  );
}
