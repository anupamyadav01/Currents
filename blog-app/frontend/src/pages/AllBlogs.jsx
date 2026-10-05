import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import { setBlogs } from "../features/blog/blogSlice";
import BlogCard from "../components/Home/BlogCard";

const FUNNY_LOADING_LINES = [
  "Bribing the database with an iced oat latte...",
  "Summoning spicy hot takes from the digital ether...",
  "Untangling spaghetti code left by past developers...",
  "Consulting the ancient scrolls of Stack Overflow...",
  "Calibrating pretentious adjectives for your reading pleasure...",
  "Arguing with an algorithm about what qualifies as 'good taste'...",
];
const Blogs = () => {
  const dispatch = useDispatch();
  const blogsList = useSelector((state) => state.blogs.blogs) || [];

  const [loading, setLoading] = useState(true);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [chaosLevel, setChaosLevel] = useState(68);
  const [votedTopic, setVotedTopic] = useState(null);

  // Cycle funny loading text while fetching
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingMsgIdx((prev) => (prev + 1) % FUNNY_LOADING_LINES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await api.get("/v1/blogs/");
        const blogsData = response.data;
        dispatch(setBlogs(blogsData.blogs || []));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#faf8f5]/60 text-neutral-900 selection:bg-amber-200">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top Playful Editorial Header */}
        <header className="mb-10 text-center">
          <h1 className="mt-3 font-serif text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl">
            The Thinking Cap
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-600 sm:text-base">
            Curated narratives, unsolicited wisdom, and essays written while
            someone was definitely supposed to be in a Zoom meeting.
          </p>
        </header>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* ================= LEFT SIDEBAR: Quirky Reading Meters ================= */}
          <aside className="order-2 space-y-6 lg:order-1 lg:col-span-3">
            {/* Procrastination Meter Card */}
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs transition hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider text-neutral-400 uppercase">
                  Productivity Deficit
                </span>
                <span className="text-lg">☕</span>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-neutral-900">
                Daily Procrastination Gauge
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Current chaos level:{" "}
                <strong className="text-amber-600">{chaosLevel}%</strong>
              </p>

              {/* Interactive Range bar */}
              <input
                type="range"
                min="0"
                max="100"
                value={chaosLevel}
                onChange={(e) => setChaosLevel(e.target.value)}
                className="mt-3 h-1.5 w-full cursor-pointer accent-neutral-900"
              />
              <div className="mt-2 flex justify-between text-[11px] text-neutral-400">
                <span>"Just 5 mins"</span>
                <span>"Deep rabbit hole"</span>
              </div>
            </div>

            {/* Quick Mood Selector */}
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs">
              <h4 className="text-xs font-bold tracking-wider text-neutral-400 uppercase">
                Filter by Mood
              </h4>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {[
                  "Existential 🌌",
                  "Caffeinated ⚡",
                  "Skeptical 🤨",
                  "Unhinged 🍿",
                  "Zen 🍃",
                ].map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setVotedTopic(mood)}
                    className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition ${
                      votedTopic === mood
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ================= CENTER COLUMN: Blogs / Funny Loader ================= */}
          <main className="order-1 lg:order-2 lg:col-span-6">
            {loading ? (
              /* Playful Loading Screen */
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white/70 p-8 text-center shadow-xs">
                {/* Quirky Bouncing Mascot */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-2xl shadow-md transition-transform">
                  <span className="animate-bounce">📖</span>
                  <div className="absolute -bottom-1 h-2 w-10 rounded-full bg-neutral-300/50 blur-xs" />
                </div>

                <h3 className="mt-6 font-serif text-lg font-bold text-neutral-900">
                  Please hold while our hamsters run...
                </h3>

                {/* Rotating Funny Message */}
                <p className="mt-2 min-h-[3rem] max-w-sm text-sm font-medium text-neutral-600 transition-opacity duration-300">
                  "{FUNNY_LOADING_LINES[loadingMsgIdx]}"
                </p>

                {/* Fake progress ticker */}
                <div className="mt-4 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-900" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-900 [animation-delay:200ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-900 [animation-delay:400ms]" />
                </div>
              </div>
            ) : blogsList.length === 0 ? (
              /* Humorous Empty State */
              <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-xs">
                <span className="text-4xl">🦗</span>
                <h3 className="mt-3 font-serif text-xl font-bold text-neutral-900">
                  Tumbleweeds and silence...
                </h3>
                <p className="mt-2 text-sm text-neutral-500">
                  No stories found yet. Everyone is either busy overthinking
                  their first paragraph or looking for the perfect stock photo.
                </p>
              </div>
            ) : (
              /* Blog Feed with Dividers */
              <div className="divide-y divide-neutral-200/80 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-xs sm:p-6">
                {blogsList.map((post) => (
                  <div
                    key={post._id || post.id}
                    className="py-6 first:pt-2 last:pb-2"
                  >
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            )}
          </main>

          {/* ================= RIGHT SIDEBAR: Hot Takes & Editorial Widgets ================= */}
          <aside className="order-3 space-y-6 lg:col-span-3">
            {/* Questionable Life Advice */}
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-100 text-xs">
                  💡
                </span>
                <h3 className="text-xs font-bold tracking-wider text-neutral-900 uppercase">
                  Unsolicited Life Hacks
                </h3>
              </div>
              <ul className="mt-3 space-y-2.5 text-xs text-neutral-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">•</span>
                  <span>
                    If you never check your email, you never have any unread
                    emails.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">•</span>
                  <span>
                    Reading 3 articles counts as cardio for your imagination.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">•</span>
                  <span>
                    Write drunk, edit sober, delete before anyone sees it.
                  </span>
                </li>
              </ul>
            </div>

            {/* Reader Poll Widget */}
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs">
              <span className="text-xs font-bold tracking-wider text-neutral-400 uppercase">
                Live Debate
              </span>
              <h4 className="mt-1 text-sm font-semibold text-neutral-900">
                Tab count right now?
              </h4>
              <div className="mt-3 space-y-2 text-xs">
                {[
                  { label: "1 - 5 (Monk tier)", votes: "12%" },
                  { label: "6 - 20 (Normal human)", votes: "34%" },
                  { label: "40+ (My fan is crying)", votes: "54%" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-neutral-100 bg-neutral-50 px-3 py-2 transition hover:border-neutral-300 hover:bg-neutral-100/80"
                  >
                    <span className="font-medium text-neutral-700">
                      {item.label}
                    </span>
                    <span className="font-semibold text-neutral-900">
                      {item.votes}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Satire Box */}
            <div className="rounded-2xl border border-neutral-900 bg-neutral-900 p-5 text-white shadow-xs">
              <h4 className="font-serif text-base font-bold">
                Never miss a bad take
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                Get stories sent directly to your inbox whenever our writers
                feel sudden bursts of inspiration at 3 AM.
              </p>
              <div className="mt-3">
                <input
                  type="email"
                  placeholder="your.email@somewhere.com"
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="button"
                  className="mt-2 w-full cursor-pointer rounded-lg bg-amber-400 py-1.5 text-xs font-bold text-neutral-950 transition hover:bg-amber-300 active:scale-98"
                >
                  Join the Rabbit Hole
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
