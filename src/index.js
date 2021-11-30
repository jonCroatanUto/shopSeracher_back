const app = require("./server");
const { config } = require("./config");
app.listen(config.app.PORT, () =>
  console.log(`server running at port:${config.app.PORT}`)
);
