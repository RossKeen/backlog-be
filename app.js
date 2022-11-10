const express = require("express");
const app = express();
const { getEndpoints } = require("./controllers/api.js");

app.get("/api", getEndpoints);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
