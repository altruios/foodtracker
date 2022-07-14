import { MongoClient } from "mongodb";
import conn from './.config'
const client = new MongoClient(conn, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any);

let dbConnection: any;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("sample_airbnb");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};