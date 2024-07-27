interface ISignatureTextProps {
  children: string;
}

export function SignatureText(props: Readonly<ISignatureTextProps>) {
  const { children } = props;

  return (
    <span>
      <strong className="text-primary font-medium">{children}</strong>
    </span>
  );
}
