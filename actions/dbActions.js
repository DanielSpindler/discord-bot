export const getUsers = (db) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT name FROM users', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const userData = rows.map((row) => row.name);
          resolve(userData);
        }
      });
    });
  }

  export const addUser = (db, items) => {
     // Insert data into the table
  const stmt = db.prepare('INSERT INTO users VALUES (?, ?)');
  items.map((item) => {
    stmt.run(item.id, item.name);
  })
  stmt.finalize();


  }