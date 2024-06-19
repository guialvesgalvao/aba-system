import { Link } from "react-router-dom";
interface ILogoProps {
  icon: JSX.Element;
  to: string;
}

export function Logo(props: ILogoProps) {
  const { icon, to } = props;

  return (
    <div className="h-16 flex items-center justify-center">
      <Link to={to} className="flex items-center justify-center h-14">
        {icon}
      </Link>
    </div>
  );
}
