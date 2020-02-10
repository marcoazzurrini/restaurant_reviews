export const fetchDetails = async id => {
  const url = `/.netlify/functions/details?id=${id}`;
  let response = await fetch(url);
  let data = await response.json();
  return data;
};
