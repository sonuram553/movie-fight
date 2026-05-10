import { useEffect, useState } from "react";

export const SearchInput = ({ onChange }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for a movie..."
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
          aria-label="Clear"
        >
          ✕
        </button>
      )}
    </div>
  );
};
