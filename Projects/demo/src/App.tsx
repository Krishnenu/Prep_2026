import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
        <h1 className="text-5xl font-bold text-white mb-4 text-center">
          Tailwind CSS Configured! 🎉
        </h1>
        <p className="text-white/90 text-center mb-8 text-lg">
          Your React + Vite + TypeScript project is now powered by Tailwind CSS
        </p>

        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Counter Demo</h2>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCount(count - 1)}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Decrease
            </button>
            <span className="text-4xl font-bold text-white min-w-[80px] text-center">
              {count}
            </span>
            <button
              onClick={() => setCount(count + 1)}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Increase
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-500/30 backdrop-blur-sm rounded-xl p-4 border border-blue-300/30 hover:bg-blue-500/40 transition-colors">
            <h3 className="text-white font-semibold mb-2">Responsive</h3>
            <p className="text-white/80 text-sm">Mobile-first utilities</p>
          </div>
          <div className="bg-purple-500/30 backdrop-blur-sm rounded-xl p-4 border border-purple-300/30 hover:bg-purple-500/40 transition-colors">
            <h3 className="text-white font-semibold mb-2">Modern</h3>
            <p className="text-white/80 text-sm">Glassmorphism design</p>
          </div>
          <div className="bg-pink-500/30 backdrop-blur-sm rounded-xl p-4 border border-pink-300/30 hover:bg-pink-500/40 transition-colors">
            <h3 className="text-white font-semibold mb-2">Animated</h3>
            <p className="text-white/80 text-sm">Smooth transitions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

