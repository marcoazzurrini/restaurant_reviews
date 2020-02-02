export const fetchPlaces = async (lat, lng) => {
  const url = `http://localhost:4000/places?lat=${lat}&lng=${lng}`;
  let response = await fetch(url, { mode: "no-cors" });
  let data = await response.json();
  console.log(data);
  return data;
  // let response = await fetch(
  //   `https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=${lat},${lng}&radius=5000&type=restaurant&key=${process.env.GOOGLE_API}`
  // );
  // let data = await response.json();
  // return data;
};
