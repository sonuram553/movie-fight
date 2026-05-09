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
      { label: "Box Office",  l: parseBoxOffice(leftDetails.BoxOffice),  r: parseBoxOffice(rightDetails.BoxOffice) },
      { label: "Metascore",   l: parseFloat(leftDetails.Metascore),      r: parseFloat(rightDetails.Metascore) },
      { label: "IMDB Rating", l: parseFloat(leftDetails.imdbRating),     r: parseFloat(rightDetails.imdbRating) },
      { label: "Awards",      l: parseAwards(leftDetails.Awards),        r: parseAwards(rightDetails.Awards) },
    ];
    return Object.fromEntries(
      stats.map(({ label, l, r }) => [label, l > r ? "left" : r > l ? "right" : null])
    ) as Record<string, "left" | "right" | null>;
  }, [leftDetails, rightDetails]);

  return (
    <div className="mx-auto mt-8 flex w-4/5 gap-50">
      <div className="w-1/2">
        <Movie side="left" onDetailsChange={setLeftDetails} winners={winners} />
      </div>
      <div className="w-1/2">
        <Movie side="right" onDetailsChange={setRightDetails} winners={winners} />
      </div>
    </div>
  );
};
