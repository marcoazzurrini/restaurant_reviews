import fetch from "node-fetch";

exports.handler = async (event, context) => {
  const key = process.env.REACT_APP_GOOGLE_API;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${event.queryStringParameters.id}&fields=review,name,rating,geometry,formatted_address&key=${key}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(data)
    }))
    .catch(err => ({ statusCode: 422, body: JSON.stringify(err) }));
};
