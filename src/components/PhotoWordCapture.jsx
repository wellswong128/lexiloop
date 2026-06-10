import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../features/locale/LocaleContext.jsx";
import {
  completeWordsInBatch,
  fetchExtractedWords,
} from "../features/words/completeWordApi.js";
import { WORD_SOURCES } from "../features/words/wordTypes.js";
import { useWordsContext } from "../features/words/WordsContext.jsx";
import { compressImageFile } from "../lib/compressImage.js";

function normalizeManualTerm(value) {
  return value.trim().toLowerCase().replace(/[^a-z'-]/g, "");
}

function PhotoWordCapture() {
  const { t } = useLocale();
  const navigate = useNavigate();
  const { importWords, words } = useWordsContext();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [step, setStep] = useState("upload");
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [detectedWords, setDetectedWords] = useState([]);
  const [selectedTerms, setSelectedTerms] = useState([]);
  const [manualTerm, setManualTerm] = useState("");
  const [previewWords, setPreviewWords] = useState([]);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [completionProgress, setCompletionProgress] = useState({ current: 0, total: 0 });

  const existingTerms = useMemo(
    () => new Set(words.map((word) => word.term.trim().toLowerCase())),
    [words],
  );

  async function handleImageFile(file) {
    try {
      setError("");
      setStatusMessage("");
      setIsExtracting(true);

      const compressed = await compressImageFile(file);

      setPreviewUrl(compressed.previewUrl);
      setImageDataUrl(compressed.dataUrl);

      const extractedWords = await fetchExtractedWords(compressed.dataUrl);
      const terms = extractedWords.map((item) => item.term);

      setDetectedWords(terms);
      setSelectedTerms(terms.filter((term) => !existingTerms.has(term)));
      setStep("select");
      setStatusMessage(t("addWord.photo.detectedCount", { count: terms.length }));
    } catch (imageError) {
      setError(imageError.message);
    } finally {
      setIsExtracting(false);
    }
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (file) {
      handleImageFile(file);
    }

    event.target.value = "";
  }

  function toggleTerm(term) {
    setSelectedTerms((currentTerms) =>
      currentTerms.includes(term)
        ? currentTerms.filter((value) => value !== term)
        : [...currentTerms, term],
    );
  }

  function handleAddManualTerm() {
    const term = normalizeManualTerm(manualTerm);

    if (!term) {
      return;
    }

    setDetectedWords((currentWords) =>
      currentWords.includes(term) ? currentWords : [...currentWords, term],
    );
    setSelectedTerms((currentTerms) =>
      currentTerms.includes(term) ? currentTerms : [...currentTerms, term],
    );
    setManualTerm("");
  }

  async function handleCompleteSelected() {
    if (selectedTerms.length === 0) {
      setError(t("addWord.photo.selectAtLeastOne"));
      return;
    }

    try {
      setError("");
      setStatusMessage("");
      setIsCompleting(true);
      setCompletionProgress({ current: 0, total: selectedTerms.length });

      const completedWords = await completeWordsInBatch(selectedTerms, {
        onProgress: (current, total) => {
          setCompletionProgress({ current, total });
        },
      });

      setPreviewWords(
        completedWords.map((word, index) => ({
          ...word,
          id: `${selectedTerms[index]}-${index}`,
          enabled: true,
        })),
      );
      setStep("preview");
      setStatusMessage(t("addWord.photo.previewReady"));
    } catch (completeError) {
      setError(completeError.message);
    } finally {
      setIsCompleting(false);
    }
  }

  function updatePreviewWord(wordId, field, value) {
    setPreviewWords((currentWords) =>
      currentWords.map((word) =>
        word.id === wordId
          ? {
              ...word,
              [field]: value,
            }
          : word,
      ),
    );
  }

  function togglePreviewWord(wordId) {
    setPreviewWords((currentWords) =>
      currentWords.map((word) =>
        word.id === wordId
          ? {
              ...word,
              enabled: !word.enabled,
            }
          : word,
      ),
    );
  }

  async function handleSaveAll() {
    const wordsToSave = previewWords
      .filter((word) => word.enabled)
      .map((word) => ({
        term: word.term,
        definition: word.definition,
        translation: word.translation,
        pronunciation: word.pronunciation,
        partOfSpeech: word.partOfSpeech,
        example: word.example,
        tags: word.tags,
      }))
      .filter((word) => word.term.trim() && word.definition.trim());

    if (wordsToSave.length === 0) {
      setError(t("addWord.photo.noValidWords"));
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const result = await importWords(wordsToSave, { source: WORD_SOURCES.PHOTO });

      const importedCount = result.importedWords.length;
      const skippedCount = result.skippedWords.length;

      if (importedCount === 0) {
        setError(t("addWord.photo.allSkipped"));
        return;
      }

      setStatusMessage(
        t("addWord.photo.saveSuccess", {
          imported: importedCount,
          skipped: skippedCount,
        }),
      );
      navigate("/words");
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSaving(false);
    }
  }

  function resetFlow() {
    setStep("upload");
    setPreviewUrl("");
    setImageDataUrl("");
    setDetectedWords([]);
    setSelectedTerms([]);
    setPreviewWords([]);
    setManualTerm("");
    setError("");
    setStatusMessage("");
    setCompletionProgress({ current: 0, total: 0 });
  }

  return (
    <div className="space-y-5">
      {step === "upload" ? (
        <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/70 p-5 text-center">
          <p className="text-sm font-semibold text-blue-950">{t("addWord.photo.uploadTitle")}</p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
            {t("addWord.photo.uploadDescription")}
          </p>

          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              className="rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800 disabled:bg-slate-300"
              disabled={isExtracting}
              onClick={() => cameraInputRef.current?.click()}
              type="button"
            >
              {t("addWord.photo.takePhoto")}
            </button>
            <button
              className="rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50 disabled:bg-slate-100"
              disabled={isExtracting}
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              {t("addWord.photo.choosePhoto")}
            </button>
          </div>

          <input
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
            ref={cameraInputRef}
            type="file"
          />
          <input
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
            type="file"
          />

          {isExtracting ? (
            <p className="mt-4 text-sm font-medium text-blue-700">
              {t("addWord.photo.extracting")}
            </p>
          ) : null}
        </div>
      ) : null}

      {step !== "upload" && previewUrl ? (
        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white">
          <img
            alt={t("addWord.photo.previewAlt")}
            className="max-h-64 w-full object-contain bg-slate-100"
            src={previewUrl}
          />
        </div>
      ) : null}

      {step === "select" ? (
        <div className="space-y-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-blue-950">{t("addWord.photo.selectTitle")}</h3>
              <p className="mt-1 text-sm text-slate-600">{t("addWord.photo.selectDescription")}</p>
            </div>
            <button
              className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-700"
              onClick={resetFlow}
              type="button"
            >
              {t("addWord.photo.retake")}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {detectedWords.map((term) => {
              const isSelected = selectedTerms.includes(term);
              const alreadySaved = existingTerms.has(term);

              return (
                <button
                  className={[
                    "rounded-full border px-3 py-2 text-sm font-bold transition",
                    alreadySaved
                      ? "border-slate-200 bg-slate-100 text-slate-400"
                      : isSelected
                        ? "border-blue-700 bg-blue-700 text-white"
                        : "border-blue-200 bg-white text-blue-800 hover:bg-blue-100",
                  ].join(" ")}
                  disabled={alreadySaved}
                  key={term}
                  onClick={() => toggleTerm(term)}
                  type="button"
                >
                  {term}
                  {alreadySaved ? ` (${t("addWord.photo.alreadySaved")})` : ""}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              onChange={(event) => setManualTerm(event.target.value)}
              placeholder={t("addWord.photo.manualPlaceholder")}
              value={manualTerm}
            />
            <button
              className="rounded-full border border-blue-200 bg-white px-4 py-3 text-sm font-bold text-blue-700"
              onClick={handleAddManualTerm}
              type="button"
            >
              {t("addWord.photo.addManual")}
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-slate-600">
              {t("addWord.photo.selectedCount", { count: selectedTerms.length })}
            </p>
            <button
              className="rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800 disabled:bg-slate-300"
              disabled={isCompleting || selectedTerms.length === 0}
              onClick={handleCompleteSelected}
              type="button"
            >
              {isCompleting
                ? t("addWord.photo.completing", {
                    current: completionProgress.current,
                    total: completionProgress.total,
                  })
                : t("addWord.photo.completeSelected")}
            </button>
          </div>
        </div>
      ) : null}

      {step === "preview" ? (
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-blue-950">{t("addWord.photo.previewTitle")}</h3>
              <p className="mt-1 text-sm text-slate-600">{t("addWord.photo.previewDescription")}</p>
            </div>
            <button
              className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-700"
              onClick={() => setStep("select")}
              type="button"
            >
              {t("addWord.photo.backToSelect")}
            </button>
          </div>

          <div className="space-y-3">
            {previewWords.map((word) => (
              <div
                className={[
                  "rounded-2xl border p-4",
                  word.enabled ? "border-blue-100 bg-white" : "border-slate-200 bg-slate-50 opacity-70",
                ].join(" ")}
                key={word.id}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <input
                      checked={word.enabled}
                      onChange={() => togglePreviewWord(word.id)}
                      type="checkbox"
                    />
                    <span>{word.term}</span>
                  </label>
                  {word.usedFallback ? (
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800">
                      {t("addWord.photo.demoFallback")}
                    </span>
                  ) : null}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="font-semibold text-slate-700">{t("addWord.definition")}</span>
                    <textarea
                      className="mt-1 min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2"
                      onChange={(event) =>
                        updatePreviewWord(word.id, "definition", event.target.value)
                      }
                      value={word.definition}
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="font-semibold text-slate-700">{t("addWord.translation")}</span>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                      onChange={(event) =>
                        updatePreviewWord(word.id, "translation", event.target.value)
                      }
                      value={word.translation}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              className="rounded-full bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-800 disabled:bg-slate-300"
              disabled={isSaving}
              onClick={handleSaveAll}
              type="button"
            >
              {isSaving ? t("common.saving") : t("addWord.photo.saveAll")}
            </button>
          </div>
        </div>
      ) : null}

      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      {statusMessage ? (
        <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {statusMessage}
        </p>
      ) : null}

    </div>
  );
}

export default PhotoWordCapture;
