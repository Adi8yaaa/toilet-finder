"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./components/Map"), {
  ssr: false,
});

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import BottomSheet from "./components/BottomSheet";
import { useToilets } from "./hooks.ts/useToilets";
import { Toilet } from "./types/toilet";
import { useLocation } from "./hooks.ts/useLocation";

export default function Home() {
  const { toilets, search } = useToilets();
  const [selected, setSelected] = useState<Toilet | null>(null);
  const { coords, getLocation } = useLocation();

  console.log("TOILETS:", toilets);

  return (
    <main className="relative">
      <SearchBar onSearch={search} />

    <Map
      toilets={toilets}
      coords={coords}
      onSelect={setSelected}
    />

      <BottomSheet
        selected={selected}
        onClose={() => setSelected(null)}
      />
    </main>
  );
}