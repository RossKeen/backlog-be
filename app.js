const cors = require("cors");
const express = require("express");
const app = express();
const { send404 } = require("./controllers/404.js");
const { getEndpoints } = require("./controllers/api.js");
const { getEntries, postEntry, patchEntry } = require("./controllers/entries.js");
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require("./errors/errors.js");

app.use(cors());
app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/entries", getEntries);
app.post("/api/entries", postEntry);
app.patch("/api/entries/:entry_id", patchEntry);

app.all("*", send404);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
