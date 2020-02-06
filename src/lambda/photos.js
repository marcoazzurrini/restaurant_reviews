import fetch from "node-fetch";
import { Base64Encode } from "base64-stream";

exports.handler = async (event, context) => {
  const key = process.env.REACT_APP_GOOGLE_API;
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${event.queryStringParameters.reference}&key=${key}`;
  return fetch(url)
    .then(
      res =>
        new Base64Encode({
          prefix: `data:${r.headers.get("content-type")};base64,`
        })
    )
    .then(data => ({
      statusCode: 200,
      body: new Base64Encode(data)
    }))
    .catch(err => ({ statusCode: 422, body: JSON.stringify(err) }));
};
