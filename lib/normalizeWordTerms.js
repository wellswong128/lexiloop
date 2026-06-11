const WORD_SPLIT_PATTERN = /[\s,;/|]+/;

export function normalizeSingleWordTerm(value) {
  const term = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z'-]/g, "");

  if (!term || term.length < 2 || WORD_SPLIT_PATTERN.test(term)) {
    return "";
  }

  return term;
}

export function splitIntoSingleWordTerms(input) {
  const rawItems = Array.isArray(input) ? input : [input];
  const seen = new Set();
  const terms = [];

  rawItems.forEach((item) => {
    const raw = typeof item === "string" ? item : item?.term ?? "";
    String(raw)
      .split(WORD_SPLIT_PATTERN)
      .forEach((part) => {
        const term = normalizeSingleWordTerm(part);

        if (term && !seen.has(term)) {
          seen.add(term);
          terms.push(term);
        }
      });
  });

  return terms;
}
