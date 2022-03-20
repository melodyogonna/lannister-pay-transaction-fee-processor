const app = require("express")();
const morgan = require("morgan");

const routes = require("./routes");

app.use(morgan("tiny"));
app.use(routes);

module.exports = app;
