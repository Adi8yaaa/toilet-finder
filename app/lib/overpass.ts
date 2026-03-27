export async function fetchToilets(lat: number, lon: number) {
  const query = `
    [out:json];
    node["amenity"="toilets"](around:1500,${lat},${lon});
    out;
  `;

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
  });

  const data = await res.json();

  return data.elements.map((el: any) => ({
    id: el.id,
    lat: el.lat,
    lon: el.lon,
    name: el.tags?.name,
  }));
}