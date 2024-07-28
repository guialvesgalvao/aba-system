import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";

interface IUserAvatarProps {
  name?: {
    text: string;
    enabled?: boolean;
  };
  image: string;
  fallback?: {
    initials: string;
    delay: number;
  };
}

export function UserAvatar(props: Readonly<IUserAvatarProps>) {
  const {
    name = {
      text: "User",
      enabled: true,
    },
    image,
    fallback,
  } = props;

  return (
    <div className="w-full flex items-center gap-2 px-4">
      <Avatar>
        <AvatarImage src={image} alt="User image" />
        {fallback && (
          <AvatarFallback
            delayMs={fallback.delay}
            className="text-primary text-xs font-medium"
          >
            {fallback.initials}
          </AvatarFallback>
        )}
      </Avatar>
      {name && name.enabled && (
        <Label className="font-medium">{name.text}</Label>
      )}
    </div>
  );
}
