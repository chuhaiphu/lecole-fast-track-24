import sqlite3 from "sqlite3";

export function initializeDatabase() {
  const db = new sqlite3.Database("./database/todos.db", (err) => {
    if (err) {
      console.error("Error opening database:", err);
    } else {
      console.log("Connected to the SQLite database.");
    }
  });

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        status TEXT CHECK(status IN ('backlog', 'in_progress', 'done')) NOT NULL DEFAULT 'backlog',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const seedTodos = [
      { title: "Learn React", status: "done" },
      { title: "Build a Todo App", status: "in_progress" },
      { title: "Master TypeScript", status: "backlog" },
    ];

    db.get("SELECT COUNT(*) as count FROM todos", (err, row) => {
      if (row?.count === 0) {
        const stmt = db.prepare("INSERT INTO todos (title, status) VALUES (?, ?)");
        seedTodos.forEach(todo => {
          stmt.run(todo.title, todo.status);
        });
        stmt.finalize();
        console.log("Database seeded with initial todos");
      }
    });
  });

  return db;
}
