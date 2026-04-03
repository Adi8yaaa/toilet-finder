"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }: any) {
  const [query, setQuery] = useState("");

  function handleSearch() {
    if (!query.trim()) return;

    console.log("Searching for:", query); // ✅ debug
    onSearch(query);
  }

  return (
    <div className="absolute top-4 left-4 right-4 z-[1000] space-y-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search location..."
        className="w-full p-3 rounded-xl shadow-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      <button
        onClick={handleSearch}
        className="w-full bg-black text-white p-2 rounded-xl"
      >
        Search
      </button>
    </div>
  );
}