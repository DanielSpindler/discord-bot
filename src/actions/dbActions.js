export const getUsers = (db) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT ${process.env.textColumn} FROM ${process.env.tableName}`,
      [],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const data = rows.map((row) => row[process.env.textColumn]);
          console.log(data);
          resolve(data);
        }
      }
    );
  });
};

export const addUser = (db, items) => {
  // Insert data into the table
  const stmt = db.prepare(`INSERT INTO ${process.env.tableName} VALUES (?, ?)`);
  items.map((item) => {
    stmt.run(item.id, item.name);
  });
  stmt.finalize();
};
