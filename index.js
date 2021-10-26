const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());
app.options("*", cors());

let hasFailed = false;

// request that will fail once, with a 401 status error
// any subsequent requests will be successfull
app.get("/fail_once", (req, res) => {
    if (!hasFailed) {
      res.status(401);
    }
    hasFailed = true;
    res.send(JSON.stringify("fail"));
});

// fake request for refreshing the token
app.get("/refresh", (req, res) => {
  setTimeout(() => {
    res.send(JSON.stringify("refresh"));
  }, 1000);
});


// request that takes 500ms to complete
app.get("/request2", (req, res) => {
  setTimeout(() => {
    res.send(JSON.stringify("req2 - 500ms"));
  }, 500);
});

// request that takes 250ms to complete
app.get("/request3", (req, res) => {
  setTimeout(() => {
    res.send(JSON.stringify("req3 - 250ms"));
  }, 250);
});

// request that takes 0ms to complete
app.get("/request4", (req, res) => {
  setTimeout(() => {

    res.send(JSON.stringify("req4 - 10ms"));
  }, 10)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
