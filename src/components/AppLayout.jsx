import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/words", label: "Words" },
  { to: "/words/new", label: "Add Word" },
  { to: "/review/flashcards", label: "Flashcards" },
  { to: "/review/quiz", label: "Quiz" },
  { to: "/mistakes", label: "Mistakes" },
  { to: "/import", label: "Import" },
  { to: "/settings", label: "Settings" },
];

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-blue-50 text-slate-900">
      <header className="border-b border-blue-200/70 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <NavLink
            to="/"
            className="w-fit rounded-lg text-2xl font-bold tracking-tight text-blue-950"
          >
            LexiLoop
          </NavLink>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
                    isActive
                      ? "bg-blue-700 text-white shadow-sm shadow-blue-900/20"
                      : "text-slate-600 hover:bg-blue-100 hover:text-blue-950",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl place-items-center px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;
