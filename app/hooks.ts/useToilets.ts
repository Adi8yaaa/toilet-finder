"use client";

import { useState } from "react";
import { fetchToilets } from "../lib/overpass";
import { geocodeLocation } from "../lib/geocode";

export function useToilets() {
  const [toilets, setToilets] = useState([]);

  async function search(input: string, userCoords?: any) {
  console.log("INPUT:", input); // ✅ debug

  let coords;

  if (input.includes(",")) {
    const [lat, lon] = input.split(",").map(Number);
    coords = { lat, lon };
  } else {
    coords = await geocodeLocation(input);
    console.log("GEOCODE RESULT:", coords); // ✅ debug
  }

  if (!coords) {
    console.log("No coords found ❌");
    return;
  }

  const data = await fetchToilets(coords.lat, coords.lon);

  console.log("TOILETS:", data); // ✅ debug

  setToilets(data);
}

  return { toilets, search };
}