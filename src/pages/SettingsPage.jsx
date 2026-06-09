import { useState } from "react";
import { WORDS_STORAGE_KEY } from "../lib/storage.js";
import { useWordsContext } from "../features/words/WordsContext.jsx";

function SettingsPage() {
  const { resetAllWords, words } = useWordsContext();
  const [message, setMessage] = useState("");

  function handleReset() {
    const shouldReset = window.confirm(
      "Delete all local LexiLoop words? This cannot be undone.",
    );

    if (!shouldReset) {
      return;
    }

    resetAllWords();
    setMessage("All local words were deleted.");
  }

  return (
    <section className="w-full max-w-4xl rounded-3xl border border-blue-200/70 bg-white/90 p-6 shadow-2xl shadow-blue-950/10 sm:p-10">
      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
          App Preferences
        </p>
        <h1 className="text-4xl font-bold text-blue-950 sm:text-5xl">
          Settings
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Manage local browser data for this MVP. Supabase sync will be added
          later.
        </p>
      </div>

      {message ? (
        <p className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl bg-blue-50 p-5">
          <h2 className="text-lg font-bold text-blue-950">Local Storage</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-bold text-blue-700">Storage Key</dt>
              <dd className="mt-1 break-all text-slate-700">
                {WORDS_STORAGE_KEY}
              </dd>
            </div>
            <div>
              <dt className="font-bold text-blue-700">Saved Words</dt>
              <dd className="mt-1 text-slate-700">{words.length}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <h2 className="text-lg font-bold text-red-800">Danger Zone</h2>
          <p className="mt-2 text-sm leading-6 text-red-700">
            Resetting data removes all words, review progress, and mistake
            history from this browser.
          </p>
          <button
            className="mt-5 rounded-full bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:bg-slate-300"
            disabled={words.length === 0}
            onClick={handleReset}
            type="button"
          >
            Reset Local Data
          </button>
        </div>
      </div>
    </section>
  );
}

export default SettingsPage;
