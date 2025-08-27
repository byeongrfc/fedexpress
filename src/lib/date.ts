import {
  type Locale as DateLocale,
  format,
  isTomorrow,
  formatDistanceToNow,
} from "date-fns";
import { enUS, fr, es } from "date-fns/locale";
import type { Locale } from "@/i18n/routing";

const dateLocales: Record<string, DateLocale> = {
  en: enUS,
  fr,
  es,
};

export function formatShortDate(date: Date, locale: Locale | string): string {
  const dateLocale = dateLocales[locale] || enUS;
  return format(date, "MMM d, yyyy", { locale: dateLocale });
}

export function formatToISODate(date: Date, locale: Locale | string): string {
  const dateLocale = dateLocales[locale] || enUS;
  return format(date, "yyyy-MM-dd", { locale: dateLocale });
}

export function formatDateTimeShort(
  date: Date,
  locale: Locale | string
): string {
  const dateLocale = dateLocales[locale] || enUS;
  return format(date, "MMM d, h:mm a", { locale: dateLocale });
}

export function formatFriendlyDate(
  date: Date,
  locale: Locale | string
): string {
  const dateLocale = dateLocales[locale] || enUS;
  if (isTomorrow(date)) {
    return `Tomorrow, ${format(date, "MMM d", { locale: dateLocale })}`;
  }

  return `${format(date, "EEEE", { locale: dateLocale })}, ${format(
    date,
    "MMM d",
    {
      locale: dateLocale,
    }
  )}`;
}

export function formatFullDate(date: Date, locale: Locale | string): string {
  const dateLocale = dateLocales[locale] || enUS;
  return format(date, "EEEE, MMMM d, yyyy", { locale: dateLocale });
}

export function formatRelativeTime(
  date: Date,
  locale: Locale | string
): string {
  const dateLocale = dateLocales[locale] || enUS;
  return formatDistanceToNow(date, { addSuffix: true, locale: dateLocale });
}
