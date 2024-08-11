import { AppRoute } from "@/components/nav/nav";

import { ColumnFilterOptionsSchema } from "@/components/render-table/column-filter-controller/column-filter-controller";

import {
  CircleCheckBig,
  BookDashed,
  Archive,
  HomeIcon,
  Factory,
  MapPin,
  Package,
  User,
  Truck,
  ShoppingBag,
} from "lucide-react";

export const STATUS_OPTIONS: ColumnFilterOptionsSchema[] = [
  {
    value: "enabled",
    label: "Ativo",
    icon: CircleCheckBig,
  },
  {
    value: "draft",
    label: "Rascunho",
    icon: BookDashed,
  },
  {
    value: "archive",
    label: "Arquivado",
    icon: Archive,
  },
];

export const SYSTEM_ROUTES: AppRoute[] = [
  {
    icon: HomeIcon,
    to: "/",
    text: "Início",
    tooltip: "Ir para página inicial",
  },
  {
    icon: ShoppingBag,
    to: "/orders",
    text: "Pedidos",
    tooltip: "Ir para páginas de Pedidos",
  },
  {
    icon: Package,
    to: "/products",
    text: "Produtos",
    tooltip: "Ir para páginas de Produtos",
  },
  {
    icon: User,
    to: "/customers",
    text: "Clientes",
    tooltip: "Ir para páginas de Clientes",
  },
  {
    icon: Factory,
    to: "/suppliers",
    text: "Fornecedores",
    tooltip: "Ir para páginas de Fornecedores",
  },
  {
    icon: MapPin,
    to: "/origins",
    text: "Origens",
    tooltip: "Ir para páginas de Origens",
  },
  {
    icon: Truck,
    to: "/delivery-persons",
    text: "Tipos de Entrega",
    tooltip: "Ir para páginas de Tipos de Entrega",
  },
];
