require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//MySQL 연결
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "booksearcher",
});

db.connect((err) => {
    if (err) {
        console.error("My SQL 연결 실패 : ", err);
        return;
    }
    console.log("MySQL 연결 성공");
})

// API로 도서 목록 가져오기
app.get("/books", async (req, res) => {
    db.query("SELECT * FROM books", (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

app.post("/books", (req, res) => {
    const { title, author, publisher, stock } = req.body;
    db.query(
        "INSERT INTO books (title, author, publisher, stock) VALUES (?, ?, ?, ?)",
        [title, author, publisher, stock],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ id: result.insertId, title, author, publisher, stock });
        }
    );
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Backend running on port 5000");
});
