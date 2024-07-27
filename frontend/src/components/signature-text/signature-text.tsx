interface ISignatureTextProps {
  children: string;
}

export function SignatureText(props: Readonly<ISignatureTextProps>) {
  const { children } = props;

  return (
    <p>
      <strong className="text-primary font-medium">{children}</strong>
    </p>
  );
}
