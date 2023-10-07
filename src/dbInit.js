import sqlite3 from "sqlite3";

export const dbInit = () => {
  const db = new sqlite3.Database(`${process.env.databaseName}.db`);

  // Create a table
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS ${process.env.tableName} (id INT, ${process.env.textColumn} TEXT)`,
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log("Table created or already exists.");
        }
      }
    );
  });

  return db;
};
