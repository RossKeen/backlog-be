const express = require("express");
const app = express();
const { send404 } = require("./controllers/404.js");
const { getEndpoints } = require("./controllers/api.js");
const { getEntries } = require("./controllers/entries.js");
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require("./errors/errors.js");

app.get("/api", getEndpoints);

app.get("/api/entries", getEntries);

app.all("*", send404);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
