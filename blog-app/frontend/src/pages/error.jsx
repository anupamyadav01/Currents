import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, RefreshCw, Ghost } from "lucide-react";

const Error = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 text-zinc-900">
      <div className="relative w-full max-w-2xl text-center">
        {/* Decorative floating elements */}
        <div className="pointer-events-none absolute top-10 -left-10 animate-bounce text-4xl opacity-20">
          ✦
        </div>

        <div className="pointer-events-none absolute top-24 -right-8 animate-pulse text-3xl opacity-20">
          ✧
        </div>

        <div className="pointer-events-none absolute bottom-10 left-10 animate-pulse text-2xl opacity-20">
          ·
        </div>

        {/* Ghost */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100 shadow-inner">
          <Ghost size={48} strokeWidth={1.5} className="text-zinc-500" />
        </div>

        {/* Error Code */}
        <p className="text-sm font-semibold tracking-[0.3em] text-zinc-400 uppercase">
          Oops... 404
        </p>

        {/* Main Heading */}
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight text-zinc-950 sm:text-6xl">
          This story got lost.
        </h1>

        {/* Funny message */}
        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-zinc-500 sm:text-lg">
          Looks like this page decided to take a coffee break.
          <br />
          We searched everywhere. Even under the database. ☕
        </p>

        {/* Random status */}
        <div className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
          <span>The page is currently pretending it doesn't exist.</span>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {/* Go Home */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-700 hover:shadow-lg"
          >
            <Home size={16} />
            Take me home
          </button>

          {/* Go Back */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-50 hover:shadow-md"
          >
            <ArrowLeft size={16} />
            Go back
          </button>

          {/* Refresh */}
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2.5 text-sm text-zinc-500 transition-all duration-300 hover:bg-zinc-50 hover:text-zinc-900"
            title="Try again"
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>

        {/* Footer joke */}
        <p className="mt-12 text-xs text-zinc-400">
          Don't worry. No developers were harmed while loading this page. 😌
        </p>
      </div>
    </main>
  );
};

export default Error;
