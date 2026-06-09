export const WORDS_STORAGE_KEY = "lexiloop.words.v1";

function getDefaultStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

export function loadWords(storage = getDefaultStorage()) {
  if (!storage) {
    return [];
  }

  const rawValue = storage.getItem(WORDS_STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      console.warn("Stored LexiLoop words are not an array. Using empty list.");
      return [];
    }

    return parsedValue;
  } catch (error) {
    console.warn("Could not parse stored LexiLoop words. Using empty list.", error);
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
}
