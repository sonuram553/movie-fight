import { Movie } from "./movie";

export const App = () => {
  return (
    <div className="mx-auto mt-8 flex w-4/5 gap-50">
      <div className="w-1/2"><Movie /></div>
      <div className="w-1/2"><Movie /></div>
    </div>
  );
};
