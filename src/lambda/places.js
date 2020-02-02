// import fetch from "node-fetch";
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const key = process.env.REACT_APP_GOOGLE_API;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=${event.queryStringParameters.lat},${event.queryStringParameters.lng}&radius=5000&type=restaurant&key=${key}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(data)
    }))
    .catch(err => ({ statusCode: 422, body: JSON.stringify(err) }));
};
