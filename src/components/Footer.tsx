export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-white px-6 py-8">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="FitLog"
            className="w-10 h-10"
          />

          <span className="font-bold text-xl">
            FITLOG
          </span>
        </div>


        <p className="text-gray-400 text-sm text-center">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>

    </footer>
  );
}