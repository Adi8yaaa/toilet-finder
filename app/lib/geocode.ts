export async function geocodeLocation(query: string) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}`,
    {
      headers: {
        "User-Agent": "toilet-finder-app",
      },
    }
  );

  const data = await res.json();

  if (!data.length) return null;

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
  };
}