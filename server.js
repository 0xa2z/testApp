const express = require("express");
const bodyParser = require("body-parser");
const { rootRouter } = require("./routers/root");
const { signUpRouter } = require("./routers/signUp");
const { loginRouter } = require("./routers/login");
const { updateUserRouter } = require("./routers/updateUser");
const { deleteUserRouter } = require("./routers/deleteUser");

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.use("/", rootRouter);

app.use("/signUp", signUpRouter);

app.use("/login", loginRouter);

app.use("/updateUser", updateUserRouter);

app.use("/deleteUser", deleteUserRouter);

const server = app.listen(port, () => {
  console.log(`server started at port ${server.address().port}`);
});
