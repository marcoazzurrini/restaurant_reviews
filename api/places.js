const express = require("express");
const request = require("request");
const proxy = require("http-proxy-middleware");

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});

app.get("/places", (req, res) => {
  const key = process.env.GOOGLE_API;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=${req.query.lat},${req.query.lng}&radius=5000&type=restaurant&key=${key}`;

  if (!req.query.lat || !req.query.lng) {
    return res.send({
      error: "Please enter address"
    });
  } else {
    request({ url, json: true }, (error, { body }) => {
      if (error) {
        res.send({
          error
        });
        return;
      } else {
        res.send({
          body
        });
        return;
      }
    });
  }
});
