import { Outlet, Link } from "react-router-dom";

const Games = () => (
  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 p-8">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-violet-400 mb-10 drop-shadow-lg">
        🎮 Games Hub
      </h2>

      <nav>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <li>
            <Link
              to="Game2048"
              className="block p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-violet-500/50 transition transform hover:-translate-y-2 text-center"
            >
              <span className="text-3xl text-violet-400">🧩</span>
              <p className="mt-3 text-lg font-semibold text-white">
                Game 2048
              </p>
            </Link>
          </li>

          <li>
            <Link
              to="BrainDots"
              className="block p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-violet-500/50 transition transform hover:-translate-y-2 text-center"
            >
              <span className="text-3xl text-violet-400">🟣</span>
              <p className="mt-3 text-lg font-semibold text-white">
                Brain Dots
              </p>
            </Link>
          </li>

          <li>
            <Link
              to="Sudoku"
              className="block p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-violet-500/50 transition transform hover:-translate-y-2 text-center"
            >
              <span className="text-3xl text-violet-400">🔢</span>
              <p className="mt-3 text-lg font-semibold text-white">Sudoku</p>
            </Link>
          </li>

          <li>
            <Link
              to="UnblockMe"
              className="block p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-violet-500/50 transition transform hover:-translate-y-2 text-center"
            >
              <span className="text-3xl text-violet-400">🟦</span>
              <p className="mt-3 text-lg font-semibold text-white">
                Unblock Me
              </p>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-12">
        <Outlet />
      </div>
    </div>
  </div>
);

export default Games;
