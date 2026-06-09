import { createContext, useContext } from "react";
import { useWords } from "./useWords.js";

const WordsContext = createContext(null);

export function WordsProvider({ children }) {
  const wordsState = useWords();

  return (
    <WordsContext.Provider value={wordsState}>{children}</WordsContext.Provider>
  );
}

export function useWordsContext() {
  const context = useContext(WordsContext);

  if (!context) {
    throw new Error("useWordsContext must be used inside WordsProvider.");
  }

  return context;
}
