import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SpeakButton from "../components/SpeakButton.jsx";
import { useWordsContext } from "../features/words/WordsContext.jsx";

function getFormValues(word) {
  return {
    term: word.term,
    definition: word.definition,
    translation: word.translation,
    pronunciation: word.pronunciation,
    partOfSpeech: word.partOfSpeech,
    example: word.example,
    notes: word.notes,
    tags: Array.isArray(word.tags) ? word.tags.join(", ") : "",
  };
}

function formatDate(value) {
  if (!value) {
    return "Not yet";
  }

  return new Date(value).toLocaleString();
}

function WordDetailPage() {
  const { wordId } = useParams();
  const { updateWord, words } = useWordsContext();
  const word = words.find((currentWord) => currentWord.id === wordId);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (word) {
      setFormValues(getFormValues(word));
      setIsEditing(false);
      setError("");
    }
  }, [word]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  function handleCancel() {
    setFormValues(getFormValues(word));
    setIsEditing(false);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formValues.term.trim() || !formValues.definition.trim()) {
      setError("Please keep both the English word and definition filled in.");
      return;
    }

    updateWord(word.id, formValues);
    setError("");
    setIsEditing(false);
  }

  if (!word) {
    return (
      <section className="w-full max-w-3xl rounded-3xl border border-blue-200/70 bg-white/90 p-8 text-center shadow-2xl shadow-blue-950/10 sm:p-14">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
          Word Detail
        </p>
        <h1 className="text-4xl font-bold text-blue-950">Word Not Found</h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          This word may have been deleted or does not exist.
        </p>
        <Link
          className="mt-6 inline-flex rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
          to="/words"
        >
          Back to Word List
        </Link>
      </section>
    );
  }

  if (!formValues) {
    return null;
  }

  return (
    <section className="w-full max-w-3xl rounded-3xl border border-blue-200/70 bg-white/90 p-6 shadow-2xl shadow-blue-950/10 sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
            Word Detail
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold text-blue-950 sm:text-5xl">
              {word.term}
            </h1>
            <SpeakButton text={word.term} />
          </div>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {word.definition}
          </p>
        </div>

        {!isEditing ? (
          <button
            className="rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
            onClick={() => setIsEditing(true)}
            type="button"
          >
            Edit Word
          </button>
        ) : null}
      </div>

      {isEditing ? (
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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
                onChange={handleChange}
                value={formValues.term}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Part of speech
              </span>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                name="partOfSpeech"
                onChange={handleChange}
                value={formValues.partOfSpeech}
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
              onChange={handleChange}
              value={formValues.definition}
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
                onChange={handleChange}
                value={formValues.translation}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Pronunciation
              </span>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                name="pronunciation"
                onChange={handleChange}
                value={formValues.pronunciation}
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
              onChange={handleChange}
              value={formValues.example}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Notes</span>
            <textarea
              className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              name="notes"
              onChange={handleChange}
              value={formValues.notes}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Tags</span>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              name="tags"
              onChange={handleChange}
              value={formValues.tags}
            />
            <span className="mt-2 block text-sm text-slate-500">
              Separate tags with commas.
            </span>
          </label>

          <div className="flex flex-wrap justify-end gap-3">
            <button
              className="rounded-full bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </button>
            <button
              className="rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-8 space-y-4">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-blue-50 p-4">
              <dt className="text-sm font-bold text-blue-700">Translation</dt>
              <dd className="mt-1 text-slate-700">
                {word.translation || "None"}
              </dd>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4">
              <dt className="text-sm font-bold text-blue-700">
                Part of Speech
              </dt>
              <dd className="mt-1 text-slate-700">
                {word.partOfSpeech || "None"}
              </dd>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4">
              <dt className="text-sm font-bold text-blue-700">Pronunciation</dt>
              <dd className="mt-1 text-slate-700">
                {word.pronunciation || "None"}
              </dd>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4">
              <dt className="text-sm font-bold text-blue-700">Tags</dt>
              <dd className="mt-1 text-slate-700">
                {word.tags.length > 0 ? word.tags.join(", ") : "None"}
              </dd>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4">
              <dt className="text-sm font-bold text-blue-700">Source</dt>
              <dd className="mt-1 text-slate-700">{word.source}</dd>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4">
              <dt className="text-sm font-bold text-blue-700">Created</dt>
              <dd className="mt-1 text-slate-700">
                {formatDate(word.createdAt)}
              </dd>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4">
              <dt className="text-sm font-bold text-blue-700">Updated</dt>
              <dd className="mt-1 text-slate-700">
                {formatDate(word.updatedAt)}
              </dd>
            </div>
          </dl>

          <div className="rounded-2xl bg-slate-50 p-4">
            <h2 className="text-sm font-bold text-slate-700">Example</h2>
            <p className="mt-1 text-slate-600">{word.example || "None"}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <h2 className="text-sm font-bold text-slate-700">Notes</h2>
            <p className="mt-1 text-slate-600">{word.notes || "None"}</p>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
        <h2 className="text-lg font-bold text-blue-950">Review Status</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-bold text-blue-700">Level</dt>
            <dd className="mt-1 text-slate-700">{word.review.level}</dd>
          </div>
          <div>
            <dt className="text-sm font-bold text-blue-700">Next Review</dt>
            <dd className="mt-1 text-slate-700">
              {formatDate(word.review.nextReviewAt)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-bold text-blue-700">Correct Count</dt>
            <dd className="mt-1 text-slate-700">{word.review.correctCount}</dd>
          </div>
          <div>
            <dt className="text-sm font-bold text-blue-700">Incorrect Count</dt>
            <dd className="mt-1 text-slate-700">
              {word.review.incorrectCount}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-bold text-blue-700">Last Reviewed</dt>
            <dd className="mt-1 text-slate-700">
              {formatDate(word.review.lastReviewedAt)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-bold text-blue-700">Last Result</dt>
            <dd className="mt-1 text-slate-700">
              {word.review.lastResult || "None"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5">
        <h2 className="text-lg font-bold text-slate-800">Mistake Status</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-bold text-slate-600">In Mistakes</dt>
            <dd className="mt-1 text-slate-700">
              {word.mistake.isMistake ? "Yes" : "No"}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-bold text-slate-600">Mistake Count</dt>
            <dd className="mt-1 text-slate-700">
              {word.mistake.mistakeCount}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-bold text-slate-600">Last Mistake</dt>
            <dd className="mt-1 text-slate-700">
              {formatDate(word.mistake.lastMistakeAt)}
            </dd>
          </div>
        </dl>
      </div>

      <Link
        className="mt-8 inline-flex rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
        to="/words"
      >
        Back to Word List
      </Link>
    </section>
  );
}

export default WordDetailPage;
