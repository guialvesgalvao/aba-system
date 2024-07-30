interface ILinkMentionProps {
  children: string;
  to: string;
}

export function LinkMention(props: Readonly<ILinkMentionProps>) {
  const { children, to } = props;

  return (
    <a
      className="text-primary hover:underline"
      href={to}
      aria-label={children}
      target="_blank"
    >
      {children}
    </a>
  );
}
