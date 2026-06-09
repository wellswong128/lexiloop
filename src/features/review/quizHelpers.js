function shuffleItems(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function createQuizQuestions(words, optionCount = 4) {
  if (words.length < 2) {
    return [];
  }

  return shuffleItems(words).map((word) => {
    const wrongOptions = shuffleItems(
      words.filter((candidate) => candidate.id !== word.id),
    )
      .slice(0, optionCount - 1)
      .map((candidate) => candidate.definition);

    const options = shuffleItems([word.definition, ...wrongOptions]);

    return {
      word,
      options,
      correctAnswer: word.definition,
    };
  });
}
