import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://randomuser.me/api/portraits/men/75.jpg" />
      <AvatarFallback delayMs={600}>Usuário</AvatarFallback>
    </Avatar>
  );
}
