import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export function SystemTray() {
  const location = useLocation();

  function generateBreadCrumbItems(pathname: string) {
    const parts = pathname.split("/");

    return parts.map((part, index) => {
      return (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink>{part}</BreadcrumbLink>
        </BreadcrumbItem>
      );
    });
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Páginas</BreadcrumbItem>
        <BreadcrumbSeparator />
        {generateBreadCrumbItems(location.pathname)}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
