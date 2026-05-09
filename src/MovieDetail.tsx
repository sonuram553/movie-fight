import type { MovieDetails } from "./util";

interface Props {
  details: MovieDetails;
}

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <section className="rounded-lg bg-teal-400 px-4 py-3">
    <strong className="block text-2xl font-bold text-white">{value}</strong>
    <small className="text-base text-teal-100">{label}</small>
  </section>
);

export const MovieDetail = ({ details }: Props) => {
  return (
    <article className="mt-4">
      <header className="flex gap-4">
        <figure className="m-0 shrink-0">
          <img
            src={details.Poster !== "N/A" ? details.Poster : undefined}
            alt={details.Title}
            className="h-48 w-32 rounded-lg object-cover shadow"
          />
        </figure>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{details.Title}</h2>
          <p className="mt-1 text-sm text-gray-500">{details.Genre}</p>
          <p className="mt-2 text-sm text-gray-700">{details.Plot}</p>
        </div>
      </header>
      <dl className="mt-4 flex flex-col gap-3">
        <StatCard value={details.Awards} label="Awards" />
        <StatCard value={details.BoxOffice} label="Box Office" />
        <StatCard value={details.Metascore} label="Metascore" />
        <StatCard value={details.imdbRating} label="IMDB Rating" />
      </dl>
    </article>
  );
};
