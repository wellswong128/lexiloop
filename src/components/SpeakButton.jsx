function canSpeak() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function speakText(text) {
  if (!canSpeak() || !text.trim()) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.85;

  window.speechSynthesis.speak(utterance);
}

function SpeakButton({ className = "", label = "Speak", text }) {
  const disabled = !text?.trim() || !canSpeak();

  return (
    <button
      aria-label={`${label}: ${text}`}
      className={[
        "rounded-full bg-blue-100 px-3 py-1.5 text-sm font-bold text-blue-700 transition hover:bg-blue-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400",
        className,
      ].join(" ")}
      disabled={disabled}
      onClick={() => speakText(text)}
      type="button"
    >
      Speak
    </button>
  );
}

export default SpeakButton;
