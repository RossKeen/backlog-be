const express = require("express");
const app = express();
const { getEndpoints } = require("./controllers/api.js");
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require("./errors/errors.js");

app.get("/api", getEndpoints);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
