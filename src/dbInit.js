import sqlite3 from "sqlite3";

export const dbInit = () => {
  const db = new sqlite3.Database(`${process.env.databaseName}.db`);

  const columnsObject = JSON.parse(`{${process.env.columns}}`);

  const queryColumns = [];
  for (const key in columnsObject) {
    const value = columnsObject[key];
    queryColumns.push(`${key} ${value}`);
  }
  // Create a table
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS ${process.env.tableName} (${queryColumns.join(', ')})`,
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
