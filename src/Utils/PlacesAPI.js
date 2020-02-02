export const fetchPlaces = async (lat, lng) => {
  const url = `http://localhost:3000/.netlify/functions/places?lat=${lat}&lng=${lng}`;
  let response = await fetch(url);
  let data = await response.json();
  return data;
};
