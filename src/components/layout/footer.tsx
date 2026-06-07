export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 sm:flex-row sm:px-8">
        <p className="text-[13px] text-zinc-600">
          &copy; {new Date().getFullYear()} Trippin
        </p>
        <p className="text-[12px] text-zinc-700">
          The AI that gets your group to agree.
        </p>
      </div>
    </footer>
  );
}
