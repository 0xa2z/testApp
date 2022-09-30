const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { dbConfig } = require("./config");

exports.dbClient = new DynamoDBClient({
  region: dbConfig.region,
  endpoint: dbConfig.endpoint,
});
