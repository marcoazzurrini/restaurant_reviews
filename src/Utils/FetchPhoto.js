export const fetchPhoto = async reference => {
  const url = `/.netlify/functions/photos?reference=${reference}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  return data.results;
};
