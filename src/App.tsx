import { useState, useMemo } from "react";
import { Movie } from "./movie";
import { parseBoxOffice, parseAwards } from "./util";
import type { MovieDetails } from "./util";

export const App = () => {
  const [leftDetails, setLeftDetails] = useState<MovieDetails | null>(null);
  const [rightDetails, setRightDetails] = useState<MovieDetails | null>(null);

  const winners = useMemo(() => {
    if (!leftDetails || !rightDetails) return {};
    const stats = [
      {
        label: "Box Office",
        l: parseBoxOffice(leftDetails.BoxOffice),
        r: parseBoxOffice(rightDetails.BoxOffice),
      },
      {
        label: "Metascore",
        l: parseFloat(leftDetails.Metascore),
        r: parseFloat(rightDetails.Metascore),
      },
      {
        label: "IMDB Rating",
        l: parseFloat(leftDetails.imdbRating),
        r: parseFloat(rightDetails.imdbRating),
      },
      {
        label: "Awards",
        l: parseAwards(leftDetails.Awards),
        r: parseAwards(rightDetails.Awards),
      },
    ];
    return Object.fromEntries(
      stats.map(({ label, l, r }) => [
        label,
        l > r ? "left" : r > l ? "right" : null,
      ]),
    ) as Record<string, "left" | "right" | null>;
  }, [leftDetails, rightDetails]);

  const showHint = !leftDetails && !rightDetails;

  return (
    <>
      <header className="bg-gradient-to-br from-teal-600 via-cyan-500 to-emerald-400 px-8 py-12 shadow-lg">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-white">Movie Fight</h1>
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            />
          </svg>
        </div>
      </header>

      <main>
        <div className="mx-auto mt-8 flex w-4/5 gap-16">
          <div className="w-1/2">
            <Movie
              side="left"
              onDetailsChange={setLeftDetails}
              winners={winners}
            />
          </div>
          <div className="w-1/2">
            <Movie
              side="right"
              onDetailsChange={setRightDetails}
              winners={winners}
            />
          </div>
        </div>

        {showHint && (
          <div className="mx-auto mt-16 max-w-lg rounded-xl border border-teal-100 bg-teal-50 px-8 py-6 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-teal-700">
              How to compare movies
            </h2>
            <p className="mt-2 text-sm text-teal-600">
              Use the search boxes above to find a movie on each side. Click a
              result from the dropdown to load its details. Once both sides have
              a movie selected, stats are compared automatically — the lower
              value is highlighted in{" "}
              <span className="font-semibold text-yellow-500">yellow</span> and
              the higher in{" "}
              <span className="font-semibold text-teal-500">teal</span>.
            </p>
          </div>
        )}
      </main>
    </>
  );
};
