const { QueryCommand } = require("@aws-sdk/client-dynamodb");
const express = require("express");
const { dbClient } = require("../dynamodb/client");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const credentials = req.body;
    if (validateUserCredentials(credentials)) {
      const user_data = await queryUser(credentials);
      console.log("login response data is: ", user_data);
      if (user_data.length == 0) res.send("incorrect credential");
      else
        user_data
          ? res.send(
              `login successfull fetched user data: ${JSON.stringify(
                user_data
              )}`
            )
          : res.send(`user does not exists`);
    } else res.send("Invalid input");
  } catch (error) {
    console.log("login error occured!!: ", error);
    res.send(JSON.stringify(error));
  }
});

const queryUser = async (params) => {
  const TableName = "userdb";
  const command = new QueryCommand({
    TableName,
    KeyConditionExpression: "#uname = :u",
    FilterExpression: "#pass = :p",
    ExpressionAttributeValues: {
      ":u": { S: params.username },
      ":p": { S: params.password },
    },
    ExpressionAttributeNames: {
      "#uname": "username",
      "#pass": "password",
    },
    ScanIndexForward: true,
    Limit: 1,
  });
  try {
    const queryResponse = await dbClient.send(command);
    console.log("query response: ", queryResponse);
    return queryResponse.Items;
  } catch (error) {
    console.error(
      `Failed to fetch data from DynamoDB. Error: ${JSON.stringify(error)}`
    );
    return null;
  }
};
const validateUserCredentials = (data) => {
  console.log("login request data is: ", data);

  // TODO: validate user data
  // check if recieved data is in proper formate
  // check if data is already present
  return true;
};
exports.loginRouter = router;
