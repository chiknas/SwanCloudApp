import SQLite from 'react-native-sqlite-storage';
import {Tables} from './Tables';

const name = 'swancloudapp.db';

SQLite.DEBUG(true);
SQLite.enablePromise(true);
export const database = SQLite.openDatabase({name, location: 'default'});

class Database {
  async init() {
    database.then((db) => {
      // db.transaction((txn) => {
      //   txn.executeSql(`DROP TABLE account`);
      // });
      Tables.forEach((table) => {
        const columns = table.columns
          .map((column) => {
            return `${column.name} ${column.type} ${
              column.required ? 'NOT NULL' : ''
            }`;
          })
          .join(', ');

        db.transaction((txn) => {
          txn.executeSql(
            `SELECT name FROM sqlite_master WHERE type='table' AND name='${table.name}'`,
            [],
            function (tx, res) {
              console.log(`Creating table ${table.name}`);
              if (res.rows.length === 0) {
                console.log(`Creating table '${table.name}'`);
                txn.executeSql(`DROP TABLE IF EXISTS ${table.name}`, []);
                txn.executeSql(
                  `CREATE TABLE IF NOT EXISTS ${table.name}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    ${columns}
                    )`,
                  [],
                );
              } else {
                console.log(`Table '${table.name}' already exists.`);
              }
            },
          );
        });
      });
    });
  }
}

export default Database;
