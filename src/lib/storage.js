export const WORDS_STORAGE_KEY = "lexiland.words.v1";
const LEGACY_WORDS_STORAGE_KEY = "lexiloop.words.v1";

function getDefaultStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

function migrateWordsStorageKey(storage) {
  if (storage.getItem(WORDS_STORAGE_KEY)) {
    return;
  }

  const legacyValue = storage.getItem(LEGACY_WORDS_STORAGE_KEY);

  if (!legacyValue) {
    return;
  }

  storage.setItem(WORDS_STORAGE_KEY, legacyValue);
  storage.removeItem(LEGACY_WORDS_STORAGE_KEY);
}

export function loadWords(storage = getDefaultStorage()) {
  if (!storage) {
    return [];
  }

  migrateWordsStorageKey(storage);

  const rawValue = storage.getItem(WORDS_STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      console.warn("Stored LexiLand words are not an array. Using empty list.");
      return [];
    }

    return parsedValue;
  } catch (error) {
    console.warn("Could not parse stored LexiLand words. Using empty list.", error);
    return [];
  }
}

export function saveWords(words, storage = getDefaultStorage()) {
  if (!storage) {
    return;
  }

  storage.setItem(WORDS_STORAGE_KEY, JSON.stringify(words));
}

export function resetWords(storage = getDefaultStorage()) {
  if (!storage) {
    return;
  }

  storage.removeItem(WORDS_STORAGE_KEY);
  storage.removeItem(LEGACY_WORDS_STORAGE_KEY);
}
