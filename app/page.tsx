"use client";

//import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import { useToilets } from "./hooks.ts/useToilets";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./components/Map"), {
  ssr: false,
});


export default function Home() {
  const { toilets, search } = useToilets();

  return (
    <main className="relative">
      <SearchBar onSearch={search} />
      <Map toilets={toilets} />
    </main>
  );
}