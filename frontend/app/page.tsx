import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <main className="flex flex-col items-center justify-center gap-12 px-6 text-center">
        {/* Logo/Title */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
            SWStarter
          </h1>
          <p className="text-xl text-gray-400 max-w-md">
            Explore the Star Wars universe. Search for characters and films from a galaxy far, far away.
          </p>
        </div>

        {/* Decorative stars */}
        <div className="relative">
          <div className="absolute -top-8 -left-8 text-4xl animate-spin-slow">⭐</div>
          <div className="absolute -bottom-8 -right-8 text-3xl animate-spin-slow" style={{ animationDelay: '1s' }}>✨</div>
          
          {/* Main CTA Button */}
          <Link
            href="/search"
            className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            <span className="relative z-10 flex items-center gap-3">
              🚀 Start Searching
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-2xl">
          <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-colors">
            <span className="text-3xl">👤</span>
            <h3 className="text-lg font-semibold text-white">Characters</h3>
            <p className="text-sm text-gray-400">Search for your favorite Star Wars characters</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-colors">
            <span className="text-3xl">🎬</span>
            <h3 className="text-lg font-semibold text-white">Films</h3>
            <p className="text-sm text-gray-400">Discover details about iconic movies</p>
          </div>
        </div>
      </main>
    </div>
  );
}
