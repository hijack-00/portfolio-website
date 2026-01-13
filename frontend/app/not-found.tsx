export default function NotFound() {
  return (
    <div className="bg-black text-green-400 min-h-screen font-mono flex flex-col items-center justify-center text-center px-4">
      <div className="border border-green-400/40 bg-black/60 p-12 rounded-none backdrop-blur-sm">
        <h1 className="text-7xl md:text-8xl font-bold text-green-400 animate-pulse mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-green-300">
          <span className="text-green-400">$</span> ERROR: Page Not Found
        </h2>
        <p className="mt-4 text-lg md:text-xl text-green-500 mb-8">
          The requested resource does not exist in the system.
        </p>
        <a
          href="/"
          className="bg-green-400 text-black px-8 py-4 rounded-none hover:bg-green-300 transition-all duration-300 font-bold inline-block transform hover:scale-105"
        >
          [RETURN_TO_HOME]
        </a>
      </div>
    </div>
  );
}