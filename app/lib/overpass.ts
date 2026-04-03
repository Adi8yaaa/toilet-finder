export async function fetchToilets(lat: number, lon: number) {
  const query = `
    [out:json][timeout:25];
    node["amenity"="toilets"](around:1000,${lat},${lon});
    out;
  `;

  const endpoints = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.openstreetmap.ru/api/interpreter",
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: "POST",
        body: query,
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      return data.elements
        .filter((el: any) => el.lat && el.lon)
        .map((el: any) => ({
          id: el.id,
          lat: el.lat,
          lon: el.lon,
          name: el.tags?.name,
        }));
    } catch (err) {
      console.warn("Endpoint failed:", url);
    }
  }

  return [];
}