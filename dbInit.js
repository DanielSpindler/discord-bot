import sqlite3 from 'sqlite3';

export const dbInit = () => {

const db = new sqlite3.Database('mydatabase.db');

// Create a table
 db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INT, name TEXT)',(err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Table created or already exists.');
    }
  });
  
});

return db; 
}