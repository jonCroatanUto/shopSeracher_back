const app = require("./server");
const { config } = require("./config");
const { connect } = require("./db");

connect().then((res) => console.log(res + "connection success"));

app.listen(config.app.PORT, () =>
  console.log(`server running at port:${config.app.PORT}`)
);
