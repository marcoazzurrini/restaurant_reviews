export const fetchPlaces = async (lat, lng) => {
  const url = `/.netlify/functions/places?lat=${lat}&lng=${lng}`;
  let response = await fetch(url, { mode: "no-cors" });
  let data = await response.json();
  return data;
};
