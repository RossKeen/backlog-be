const express = require("express");
const app = express();
const { getEndpoints } = require("./controllers/api.js");
const { getEntries } = require("./controllers/entries.js");
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require("./errors/errors.js");

app.get("/api", getEndpoints);

app.get("/api/entries", getEntries);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
