import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src="*" />
      <AvatarFallback delayMs={600}></AvatarFallback>
    </Avatar>
  );
}
