import * as SQLite from "expo-sqlite";

const name = "swancloud.db";
const version = "0.1";
const description = "Db for Swan Cloud Application";
const size = 200000;

export const db = SQLite.openDatabase(name, version, description, size);

class Database {
  async init() {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='account'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS account", []);
            txn.executeSql(
              `CREATE TABLE IF NOT EXISTS account(
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    text VARCHAR(255) NOT NULL, 
                    port INT(5) NOT NULL, 
                    address VARCHAR(255) NOT NULL, 
                    type VARCHAR(255) NOT NULL
                    )`,
              []
            );
          }
        }
      );
    });

    db.transaction((txn) => {
      txn.executeSql("INSERT INTO account (text) VALUES ('test')", []);
    });

    db.transaction((txn) => {
      txn.executeSql("SELECT * FROM account", [], function (tx, res) {
        console.log("accounts:", res.rows.item(0));
      });
    });
  }
}

export default Database;
