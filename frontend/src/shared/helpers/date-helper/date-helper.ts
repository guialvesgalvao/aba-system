import {
  format,
  formatDistanceToNow,
  isToday,
  isThisWeek,
  isWithinInterval,
  subMinutes,
} from "date-fns";
import { ptBR } from "date-fns/locale";

type TextOptions = {
  updatedNow?: string;
  updatedAgo?: string;
  updatedAt?: string;
};

export function getFormattedDynamicText(
  date: Date | string,
  options?: TextOptions
) {
  const { updatedNow, updatedAgo, updatedAt } = {
    updatedNow: "Atualizado agora",
    updatedAgo: "Atualizado à {minutes} atrás",
    updatedAt: "às",
    ...options,
  };

  const now = new Date();
  const oneMinuteAgo = subMinutes(now, 1);

  if (isWithinInterval(date, { start: oneMinuteAgo, end: now })) {
    return updatedNow;
  }

  const minutesAgo = formatDistanceToNow(date, { locale: ptBR });

  if (isToday(date)) {
    const textAgo = updatedAgo.replace("{minutes}", minutesAgo);
    return textAgo;
  }

  if (isThisWeek(date)) {
    return format(date, `eeee '${updatedAt}' HH:mm`, { locale: ptBR });
  }

  return format(date, "dd/MM/yyyy HH:mm", { locale: ptBR });
}

export function getFullFormattedDate(date: Date | string) {
  return format(date, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
}
