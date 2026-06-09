import { Link } from "react-router-dom";
import { getDueWords } from "../features/review/reviewHelpers.js";
import { useWordsContext } from "../features/words/WordsContext.jsx";

function HomePage() {
  const { words } = useWordsContext();
  const dueWords = getDueWords(words);
  const mistakeWords = words.filter((word) => word.mistake.isMistake);

  return (
    <section className="w-full max-w-5xl rounded-3xl border border-blue-200/70 bg-white/90 p-6 shadow-2xl shadow-blue-950/10 sm:p-10">
      <div className="text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
          English Vocabulary Memory App
        </p>
        <h1 className="text-5xl font-bold leading-none text-blue-950 sm:text-7xl">
          LexiLoop
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Save English words, review them with flashcards, and build a simple
          spaced repetition habit.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 p-5 text-center">
          <p className="text-3xl font-bold text-blue-950">{words.length}</p>
          <p className="mt-1 text-sm font-semibold text-blue-700">Saved Words</p>
        </div>
        <div className="rounded-2xl bg-blue-50 p-5 text-center">
          <p className="text-3xl font-bold text-blue-950">{dueWords.length}</p>
          <p className="mt-1 text-sm font-semibold text-blue-700">Due Reviews</p>
        </div>
        <div className="rounded-2xl bg-blue-50 p-5 text-center">
          <p className="text-3xl font-bold text-blue-950">
            {mistakeWords.length}
          </p>
          <p className="mt-1 text-sm font-semibold text-blue-700">Mistakes</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          className="rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-800"
          to="/words/new"
        >
          Add Word
        </Link>
        <Link
          className="rounded-full bg-blue-100 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-200"
          to="/review/flashcards"
        >
          Review Flashcards
        </Link>
        <Link
          className="rounded-full bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
          to="/review/quiz"
        >
          Start Quiz
        </Link>
      </div>
    </section>
  );
}

export default HomePage;
