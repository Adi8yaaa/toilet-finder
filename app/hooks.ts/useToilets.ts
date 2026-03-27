"use client";

import { useState } from "react";
import { fetchToilets } from "../lib/overpass";
import { geocodeLocation } from "../lib/geocode";

export function useToilets() {
  const [toilets, setToilets] = useState([]);

  async function search(location: string) {
    const coords = await geocodeLocation(location);
    if (!coords) return;

    const data = await fetchToilets(coords.lat, coords.lon);
    setToilets(data);
  }

  return { toilets, search };
}