import type { MovieResult } from "./util";

interface Props {
  results: MovieResult[];
  error: string | null;
  onSelectMovie: (id: string) => void;
}

export const MovieDropdown = ({ results, error, onSelectMovie }: Props) => {
  if (error) {
    return (
      <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
        <p className="text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  if (results.length === 0) return null;

  return (
    <ul className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
      {results.map((movie) => (
        <li
          key={movie.imdbID}
          onClick={() => {
            onSelectMovie(movie.imdbID);
          }}
          className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-gray-50"
        >
          {movie.Poster !== "N/A" ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="h-12 w-12 rounded object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded bg-gray-100">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          <span className="text-sm text-gray-900">
            {movie.Title} <span className="text-gray-400">({movie.Year})</span>
          </span>
        </li>
      ))}
    </ul>
  );
};
