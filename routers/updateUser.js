const { UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const express = require("express");
const { dbClient } = require("../dynamodb/client");

const router = express.Router();

router.patch("/", async (req, res) => {
  try {
    var new_user_data = req.body;
    if (validateNewUserData(new_user_data)) {
      const updateUserResponse = await updateUser(new_user_data);
      updateUserResponse
        ? res.send(`update successfull for user: ${new_user_data.username}`)
        : res.send("error occured in trying update data");
    } else res.send("validation error pls check your input again");
  } catch (error) {
    console.log("error in updating: ", error);
    res.send("error in updating");
  }
});

const updateUser = async (new_user_data) => {
  const TableName = "userdb";
  const { username, password, name } = new_user_data;
  const command = new UpdateItemCommand({
    TableName,
    Key: {
      username: {
        S: username,
      },
    },
    UpdateExpression: "set password = :p",
    ExpressionAttributeValues: {
      ":p": { S: password },
    },
  });
  try {
    const updateCommandResponse = await dbClient.send(command);
    console.log(
      "database response for update command: ",
      updateCommandResponse
    );
    return updateCommandResponse;
  } catch (error) {
    console.error(`error occured in updating database ${error}`);
    return null;
  }
};

const validateNewUserData = (data) => {
  // TODO: validate user data
  // check if recieved data is in proper formate
  // check if data is already present
  return true;
};

exports.updateUserRouter = router;
