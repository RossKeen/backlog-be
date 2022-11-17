exports.send404 = (req, res, next) => {
  res.status(404).send({ msg: "Error 404: Not found" });
};
