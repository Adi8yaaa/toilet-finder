"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }: any) {
  const [query, setQuery] = useState("");

  return (
    <div className="absolute top-4 left-4 right-4 z-[1000]">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search location..."
        className="w-full p-3 rounded-xl shadow-lg"
      />
      <button
        onClick={() => onSearch(query)}
        className="mt-2 w-full bg-black text-white p-2 rounded-xl"
      >
        Search
      </button>
    </div>
  );
}