const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

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

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});
