function PageCard({ eyebrow, title, description }) {
  return (
    <section className="w-full max-w-3xl rounded-3xl border border-blue-200/70 bg-white/90 p-8 text-center shadow-2xl shadow-blue-950/10 sm:p-14">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
        {eyebrow}
      </p>
      <h1 className="text-5xl font-bold leading-none text-blue-950 sm:text-7xl">
        {title}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
        {description}
      </p>
    </section>
  );
}

export default PageCard;
