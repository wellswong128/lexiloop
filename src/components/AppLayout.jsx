import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/words", label: "Words" },
  { to: "/words/new", label: "Add Word" },
  { to: "/review/flashcards", label: "Flashcards" },
  { to: "/review/quiz", label: "Quiz" },
  { to: "/games/spelling-ninja", label: "Ninja Game" },
  { to: "/mistakes", label: "Mistakes" },
  { to: "/import", label: "Import" },
  { to: "/settings", label: "Settings" },
];

function MenuIcon({ isOpen }) {
  if (isOpen) {
    return (
      <svg
        aria-hidden="true"
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function AppLayout({ children }) {
  const location = useLocation();
  const isGamePage = location.pathname.startsWith("/games/spelling-ninja");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-blue-50 text-slate-900">
      {isGamePage ? null : (
        <header className="border-b border-blue-200/70 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6">
            <button
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="inline-flex size-11 items-center justify-center rounded-xl border border-blue-200 bg-white text-blue-950 transition hover:bg-blue-50"
              onClick={() => setIsMenuOpen((open) => !open)}
              type="button"
            >
              <MenuIcon isOpen={isMenuOpen} />
            </button>
            <NavLink
              to="/"
              className="rounded-lg text-2xl font-bold tracking-tight text-blue-950"
            >
              LexiLoop
            </NavLink>
          </div>

          {isMenuOpen ? (
            <nav className="mx-auto max-w-6xl border-t border-blue-100 px-4 py-3 sm:px-6">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        [
                          "block rounded-xl px-4 py-3 text-sm font-semibold transition",
                          isActive
                            ? "bg-blue-700 text-white shadow-sm shadow-blue-900/20"
                            : "text-slate-600 hover:bg-blue-100 hover:text-blue-950",
                        ].join(" ")
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </header>
      )}

      <main
        className={
          isGamePage
            ? "mx-auto grid min-h-[100svh] w-full max-w-6xl place-items-center px-2 py-2"
            : "mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl place-items-center px-4 py-8 sm:px-6 sm:py-10"
        }
      >
        {children}
      </main>
    </div>
  );
}

export default AppLayout;
