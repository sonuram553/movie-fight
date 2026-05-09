import { useState, useMemo } from "react";
import { SearchInput } from "./search";
import { MovieDropdown } from "./MovieDropdown";
import { BASE_URL, debounce, fetchMovies } from "./util";
import type { MovieResult } from "./util";
import axios from "axios";

export const Movie = () => {
  const [results, setResults] = useState<MovieResult[]>([]);
  const [error, setError] = useState<string | null>(null);

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
  };

  return (
    <div className="relative">
      <SearchInput onChange={debouncedSearch} />
      <MovieDropdown
        results={results}
        error={error}
        onSelectMovie={fetchMovieDetails}
      />
    </div>
  );
};
