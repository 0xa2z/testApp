const express = require("express");
const { rootRouter } = require("./routers/root");

const app = express();
const port = 8080;

app.use("/", rootRouter);

const server = app.listen(port, () => {
    console.log(`server started at port ${server.address().port}`);
  });