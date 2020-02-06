export const fetchPlaces = async (lat, lng) => {
  const url = `/.netlify/functions/places?lat=${lat}&lng=${lng}`;
  let response = await fetch(url);
  let data = await response.json();
  return data.results;
};
