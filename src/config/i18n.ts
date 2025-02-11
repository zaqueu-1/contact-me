export const i18nConfig = {
  defaultLocale: "en",
  locales: ["en", "pt"],
  timeZone: "America/Sao_Paulo",
} as const

export type Locale = (typeof i18nConfig)["locales"][number]

export const fallbackConfig: Record<Locale | "default", Locale> = {
  en: "en",
  pt: "en",
  default: "en",
}
