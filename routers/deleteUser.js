const { DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
const express = require("express");
const { dbClient } = require("../dynamodb/client");

const router = express.Router();

router.delete("/", async (req, res) => {
  try {
    const { username } = req.body;
    if (validateUsername(username)) {
      const deletUserResponse = await deleteUser(username);
      console.log("delete response: ", deletUserResponse);
      if (deletUserResponse == "not found") {
        res.status(404).send("user does not found");
      } else
        deletUserResponse
          ? res.send(`deleted user is: ${JSON.stringify(deletUserResponse)}`)
          : res.send("deletion error occured pls contact server admin");
    } else res.send("pls check input format");
  } catch (error) {
    console.log("error in updating: ", error);
    res.status(500).send("deletion error occured pls contact server admin");
  }
});

const deleteUser = async (username) => {
  const TableName = "userdb";
  const command = new DeleteItemCommand({
    TableName,
    Key: {
      username: {
        S: username,
      },
    },
    ReturnValues: "ALL_OLD",
  });
  try {
    const deleteCommandResponse = await dbClient.send(command);
    return deleteCommandResponse.Attributes
      ? JSON.stringify(deleteCommandResponse.Attributes)
      : "not found";
  } catch (error) {
    console.log("error occured in deleting item: ", JSON.stringify(error));
    return null;
  }
};
const validateUsername = (data) => {
  // TODO: validate user data
  // check if recieved data is in proper formate
  // check if data is already present
  return true;
};

exports.deleteUserRouter = router;
