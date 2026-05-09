import { useState, useMemo } from "react";
import { SearchInput } from "./search";
import { MovieDropdown } from "./MovieDropdown";
import { MovieDetail } from "./MovieDetail";
import { BASE_URL, debounce, fetchMovies } from "./util";
import type { MovieResult, MovieDetails } from "./util";
import axios from "axios";

interface Props {
  side: "left" | "right";
  onDetailsChange: (details: MovieDetails | null) => void;
  winners: Record<string, "left" | "right" | null>;
}

export const Movie = ({ side, onDetailsChange, winners }: Props) => {
  const [results, setResults] = useState<MovieResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<MovieDetails | null>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value) {
          setResults([]);
          setError(null);
          return;
        }
        const { results, error } = await fetchMovies(value);
        setResults(results);
        setError(error);
      }),
    [],
  );

  const fetchMovieDetails = async (movieId: string) => {
    setResults([]);
    setError(null);
    const res = await axios.get(BASE_URL, {
      params: { apikey: "4f174979", i: movieId },
    });
    setDetails(res.data);
    onDetailsChange(res.data);
  };

  return (
    <div className="relative">
      <SearchInput onChange={debouncedSearch} />
      <MovieDropdown
        results={results}
        error={error}
        onSelectMovie={fetchMovieDetails}
      />
      {details && <MovieDetail details={details} side={side} winners={winners} />}
    </div>
  );
};
