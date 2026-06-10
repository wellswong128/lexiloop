export const LOCALE_STORAGE_KEY = "lexiland.locale.v1";
const LEGACY_LOCALE_STORAGE_KEY = "lexiloop.locale.v1";
export const DEFAULT_LOCALE = "zh-Hant";
export const SUPPORTED_LOCALES = ["zh-Hans", "zh-Hant", "en"];

const LEGACY_LOCALE_MAP = {
  zh: "zh-Hant",
};

function migrateLocaleStorageKey() {
  try {
    if (localStorage.getItem(LOCALE_STORAGE_KEY)) {
      return;
    }

    const legacyValue = localStorage.getItem(LEGACY_LOCALE_STORAGE_KEY);

    if (!legacyValue) {
      return;
    }

    localStorage.setItem(LOCALE_STORAGE_KEY, legacyValue);
    localStorage.removeItem(LEGACY_LOCALE_STORAGE_KEY);
  } catch {
    // localStorage may be unavailable.
  }
}

export function normalizeLocale(locale) {
  if (SUPPORTED_LOCALES.includes(locale)) {
    return locale;
  }

  if (LEGACY_LOCALE_MAP[locale]) {
    return LEGACY_LOCALE_MAP[locale];
  }

  return DEFAULT_LOCALE;
}

export function loadLocale() {
  try {
    migrateLocaleStorageKey();
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    return normalizeLocale(stored);
  } catch {
    // localStorage may be unavailable.
  }

  return DEFAULT_LOCALE;
}

export function saveLocale(locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, normalizeLocale(locale));
  } catch {
    // localStorage may be unavailable.
  }
}
