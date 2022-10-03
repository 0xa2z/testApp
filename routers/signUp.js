const { PutItemCommand } = require("@aws-sdk/client-dynamodb");
const express = require("express");
const { dbClient } = require("../dynamodb/client");
const router = express.Router();

router.put("/", async (req, res) => {
  try {
    const registration_data = req.body;
    console.log("registratuion data is: ", registration_data);
    if (validateRegistrationData(registration_data)) {
      const putResponse = await putNewUser(registration_data);
      putResponse
        ? res.send(
            `sign up successfull for userdata: ${JSON.stringify(
              registration_data
            )}`
          )
        : res.send("sign up error occured in trying puting data to db");
    } else res.send(`Invalid data format`);
  } catch (error) {
    console.log("sign up error occured!!: ", error);
    res.send(JSON.stringify(error));
  }
});

const putNewUser = async (params) => {
  const TableName = "userdb";
  const { username, name, password } = params;
  const command = new PutItemCommand({
    TableName,
    Item: {
      username: {
        S: username,
      },
      password: {
        S: password,
      },
      name: {
        S: name,
      },
    },
  });
  try {
    const putCommandResponse = await dbClient.send(command);
    console.log("registration response data is: ", putCommandResponse);
    return putCommandResponse;
  } catch (error) {
    console.error(`Failed to put data in DynamoDB. Error: ${error}`);
    return null;
  }
};
const validateRegistrationData = (data) => {
  console.log("\nregistration request data is: ", data);

  // TODO: validate user data
  // check if recieved data is in proper formate
  // check if data is already present
  return true;
};

exports.signUpRouter = router;
