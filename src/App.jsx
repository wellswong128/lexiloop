import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import { WordsProvider } from "./features/words/WordsContext.jsx";
import AddWordPage from "./pages/AddWordPage.jsx";
import FlashcardsPage from "./pages/FlashcardsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ImportPage from "./pages/ImportPage.jsx";
import MistakesPage from "./pages/MistakesPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import SpellingNinjaPage from "./pages/SpellingNinjaPage.jsx";
import WordDetailPage from "./pages/WordDetailPage.jsx";
import WordListPage from "./pages/WordListPage.jsx";

function App() {
  return (
    <WordsProvider>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/words" element={<WordListPage />} />
          <Route path="/words/new" element={<AddWordPage />} />
          <Route path="/words/:wordId" element={<WordDetailPage />} />
          <Route path="/review/flashcards" element={<FlashcardsPage />} />
          <Route path="/review/quiz" element={<QuizPage />} />
          <Route path="/games/spelling-ninja" element={<SpellingNinjaPage />} />
          <Route path="/mistakes" element={<MistakesPage />} />
          <Route path="/import" element={<ImportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </WordsProvider>
  );
}

export default App;
