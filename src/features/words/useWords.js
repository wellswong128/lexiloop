import { useCallback, useEffect, useState } from "react";
import { loadWords, resetWords, saveWords } from "../../lib/storage.js";
import {
  createWord,
  getCurrentIsoDate,
  normalizeTags,
  normalizeTerm,
  normalizeText,
  WORD_SOURCES,
} from "./wordTypes.js";

function normalizeWordChanges(changes) {
  const normalizedChanges = { ...changes };

  if (Object.hasOwn(normalizedChanges, "term")) {
    normalizedChanges.term = normalizeText(normalizedChanges.term);
  }

  if (Object.hasOwn(normalizedChanges, "definition")) {
    normalizedChanges.definition = normalizeText(normalizedChanges.definition);
  }

  if (Object.hasOwn(normalizedChanges, "translation")) {
    normalizedChanges.translation = normalizeText(normalizedChanges.translation);
  }

  if (Object.hasOwn(normalizedChanges, "pronunciation")) {
    normalizedChanges.pronunciation = normalizeText(normalizedChanges.pronunciation);
  }

  if (Object.hasOwn(normalizedChanges, "partOfSpeech")) {
    normalizedChanges.partOfSpeech = normalizeText(normalizedChanges.partOfSpeech);
  }

  if (Object.hasOwn(normalizedChanges, "example")) {
    normalizedChanges.example = normalizeText(normalizedChanges.example);
  }

  if (Object.hasOwn(normalizedChanges, "notes")) {
    normalizedChanges.notes = normalizeText(normalizedChanges.notes);
  }

  if (Object.hasOwn(normalizedChanges, "tags")) {
    normalizedChanges.tags = normalizeTags(normalizedChanges.tags);
  }

  return normalizedChanges;
}

export function useWords(storage) {
  const [words, setWords] = useState(() => loadWords(storage));

  useEffect(() => {
    saveWords(words, storage);
  }, [storage, words]);

  const addWord = useCallback(
    (input, options = {}) => {
      const newWord = createWord(input, options);

      setWords((currentWords) => [newWord, ...currentWords]);

      return newWord;
    },
    [setWords],
  );

  const updateWord = useCallback(
    (wordId, changes) => {
      const now = getCurrentIsoDate();
      const normalizedChanges = normalizeWordChanges(changes);

      setWords((currentWords) =>
        currentWords.map((word) => {
          if (word.id !== wordId) {
            return word;
          }

          return {
            ...word,
            ...normalizedChanges,
            id: word.id,
            createdAt: word.createdAt,
            updatedAt: now,
          };
        }),
      );
    },
    [setWords],
  );

  const deleteWord = useCallback(
    (wordId) => {
      setWords((currentWords) =>
        currentWords.filter((word) => word.id !== wordId),
      );
    },
    [setWords],
  );

  const importWords = useCallback(
    (wordInputs) => {
      const existingTerms = new Set(words.map((word) => normalizeTerm(word.term)));
      const importedWords = [];
      const skippedWords = [];

      wordInputs.forEach((wordInput) => {
        const normalizedTerm = normalizeTerm(wordInput?.term);

        if (!normalizedTerm || existingTerms.has(normalizedTerm)) {
          skippedWords.push(wordInput);
          return;
        }

        const importedWord = createWord(wordInput, { source: WORD_SOURCES.IMPORT });

        importedWords.push(importedWord);
        existingTerms.add(normalizedTerm);
      });

      setWords((currentWords) => [...importedWords, ...currentWords]);

      return {
        importedWords,
        skippedWords,
      };
    },
    [setWords, words],
  );

  const resetAllWords = useCallback(() => {
    resetWords(storage);
    setWords([]);
  }, [storage, setWords]);

  return {
    words,
    addWord,
    updateWord,
    deleteWord,
    importWords,
    resetAllWords,
  };
}
