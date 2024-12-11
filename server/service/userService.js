import sqlite3 from "sqlite3";

class UserService {
  constructor() {
    this.db = new sqlite3.Database("./database/user.db", (err) => {
      if (err) {
        console.error("Error opening database:", err);
      } else {
        console.log("Connected to the SQLite database.");
      }
    });
    this.initializeDb();
  }

  initializeDb() {
    this.db.serialize(() => {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          image_url TEXT NOT NULL
          roles TEXT NOT NULL,
          secret_phrase TEXT NOT NULL
        )
      `);
    });
    this.seedUsers();
  }

  seedUsers() {
    const seedUserData = [
      { username: "user1", image_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", roles: "user", secret_phrase: "secret123" },
      { username: "admin1", image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", roles: "admin", secret_phrase: "admin123" },
      { username: "user2", image_url: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", roles: "user", secret_phrase: "secret456" },
      { username: "admin2", image_url: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", roles: "admin", secret_phrase: "admin456" }
    ];

    this.db.get("SELECT COUNT(*) AS count FROM users", (err, row) => {
      if (row?.count === 0) {
        const stmt = this.db.prepare("INSERT INTO users (username, roles, secret_phrase) VALUES (?, ?, ?)");
        for (const user of seedUserData) {
          stmt.run(user.username, user.roles, user.secret_phrase);
        }
        stmt.finalize();
        console.log("Database seeded with users data");
      }
    });
  }

  async createUser(username, roles, secret_phrase) {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO users (username, roles, secret_phrase) VALUES (?, ?, ?)",
        [username, roles, secret_phrase],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  async getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err) reject(err);
        resolve(user);
      });
    });
  }

  async updateSecretPhrase(username, newSecretPhrase) {
    return new Promise((resolve, reject) => {
      this.db.run(
        "UPDATE users SET secret_phrase = ? WHERE username = ?",
        [newSecretPhrase, username],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
}

export default new UserService();
