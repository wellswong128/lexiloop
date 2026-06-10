import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWordsContext } from "../features/words/WordsContext.jsx";

const initialFormValues = {
  term: "",
  definition: "",
  translation: "",
  pronunciation: "",
  partOfSpeech: "",
  example: "",
  tags: "",
};

function createDemoSuggestion(term) {
  const normalizedTerm = term.trim();

  return {
    term: normalizedTerm,
    definition: `A demo vocabulary card for "${normalizedTerm}". Replace this with the real definition before saving.`,
    translation: "示範翻譯",
    pronunciation: "",
    partOfSpeech: "word",
    example: `I am learning how to use "${normalizedTerm}" in a sentence.`,
    tags: ["demo", "ai-fallback"],
  };
}

async function readJsonResponse(response) {
  const text = await response.text();

  if (!text) {
    throw new Error(
      "AI service returned an empty response. Check the Vercel function logs and AGNES_API_KEY.",
    );
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      "AI service did not return JSON. If you are testing locally, run through Vercel or deploy the latest version.",
    );
  }
}

function AddWordPage() {
  const navigate = useNavigate();
  const { addWord } = useWordsContext();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [aiMessage, setAiMessage] = useState("");
  const [error, setError] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  async function handleAiFill() {
    const term = formValues.term.trim();

    if (!term) {
      setError("Enter an English word before using AI Fill.");
      return;
    }

    function applySuggestion(suggestion) {
      setFormValues((currentValues) => ({
        ...currentValues,
        term: suggestion.term || currentValues.term,
        definition: suggestion.definition || currentValues.definition,
        translation: suggestion.translation || currentValues.translation,
        pronunciation: suggestion.pronunciation || currentValues.pronunciation,
        partOfSpeech: suggestion.partOfSpeech || currentValues.partOfSpeech,
        example: suggestion.example || currentValues.example,
        tags: Array.isArray(suggestion.tags)
          ? suggestion.tags.join(", ")
          : currentValues.tags,
      }));
    }

    try {
      setError("");
      setAiMessage("");
      setIsAiLoading(true);

      const response = await fetch("/api/complete-word", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ term }),
      });
      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(data.error || "AI Fill failed.");
      }

      applySuggestion(data.suggestion);
      setAiMessage("AI suggestions were added. Review and edit before saving.");
    } catch (aiError) {
      applySuggestion(createDemoSuggestion(term));
      setError("");
      setAiMessage(
        `AI service was unavailable, so demo data was added instead. Reason: ${aiError.message}`,
      );
    } finally {
      setIsAiLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formValues.term.trim() || !formValues.definition.trim()) {
      setError("Please enter both an English word and a definition.");
      return;
    }

    try {
      setIsSaving(true);
      await addWord(formValues);
      setError("");
      navigate("/words");
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="w-full max-w-3xl rounded-3xl border border-blue-200/70 bg-white/90 p-6 shadow-2xl shadow-blue-950/10 sm:p-10">
      <div className="mb-8 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
          New Vocabulary
        </p>
        <h1 className="text-4xl font-bold text-blue-950 sm:text-5xl">
          Add Word
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          Save a word now. Flashcards and quizzes will use this data later.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-blue-950">AI Auto-Fill</h2>
              <p className="mt-1 text-sm text-slate-600">
                Type an English word, then let AI suggest editable word data.
              </p>
            </div>
            <button
              className="rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800 disabled:bg-slate-300"
              disabled={isAiLoading || isSaving}
              onClick={handleAiFill}
              type="button"
            >
              {isAiLoading ? "Filling..." : "AI Fill"}
            </button>
          </div>
          {aiMessage ? (
            <p className="mt-3 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
              {aiMessage}
            </p>
          ) : null}
        </div>

        {error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              English word
            </span>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              name="term"
              value={formValues.term}
              onChange={handleChange}
              placeholder="resilient"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Part of speech
            </span>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              name="partOfSpeech"
              value={formValues.partOfSpeech}
              onChange={handleChange}
              placeholder="adjective"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Definition
          </span>
          <textarea
            className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            name="definition"
            value={formValues.definition}
            onChange={handleChange}
            placeholder="Able to recover quickly from difficulty."
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Translation
            </span>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              name="translation"
              value={formValues.translation}
              onChange={handleChange}
              placeholder="Optional"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Pronunciation
            </span>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              name="pronunciation"
              value={formValues.pronunciation}
              onChange={handleChange}
              placeholder="/ri-ZIL-yent/"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Example sentence
          </span>
          <textarea
            className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            name="example"
            value={formValues.example}
            onChange={handleChange}
            placeholder="She is resilient after every setback."
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Tags
          </span>
          <input
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            name="tags"
            value={formValues.tags}
            onChange={handleChange}
            placeholder="advanced, personality"
          />
          <span className="mt-2 block text-sm text-slate-500">
            Separate tags with commas.
          </span>
        </label>

        <div className="flex justify-end">
          <button
            className="rounded-full bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:bg-slate-300"
            disabled={isSaving}
            type="submit"
          >
            {isSaving ? "Saving..." : "Save Word"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddWordPage;
