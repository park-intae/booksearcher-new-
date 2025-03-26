require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//MySQL 연결
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "123456",
    database: process.env.DB_NAME || "booksearch",
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

// 수정
app.put("/books/:idKey", (req, res) => {
    console.log("idKey from URL params:", req.params.idKey);

    const { idKey } = req.params;
    const { title, author, publisher, stock } = req.body;

    if (!idKey || !title || !author || !publisher || stock === undefined) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    const authorJSON = JSON.stringify(author); // author를 JSON 문자열로 변환

    db.query(
        "UPDATE books SET title = ?, author = ?, publisher = ?, stock = ? WHERE idKey = ?",
        [title, authorJSON, publisher, stock, idKey],
        (err, result) => {
            if (err) {
                console.error("DB error:", err);
                return res.status(500).json({ error: err })
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Book not found" });
            }
            res.json({ idKey, title, author, publisher, stock });
        }
    )
});

// 추가
app.post('/books', async (req, res) => {
    try {
        const { idKey, id, title, author, publisher, stock } = req.body;

        // 필수 데이터 체크
        if (!idKey || !id || !title || !author || !publisher || stock === undefined) {
            return res.status(400).json({ message: '필수 데이터가 누락되었습니다.' });
        }

        const authorJSON = JSON.stringify(author); // author를 JSON 문자열로 변환

        // MySQL 쿼리 실행
        const [result] = await db.promise().query(
            "INSERT INTO books (idKey, id, title, author, publisher, stock) VALUES (?, ?, ?, ?, ?, ?)",
            [idKey, id, title, authorJSON, publisher, stock]
        );

        res.status(201).json({ id: result.insertId, title, author: authorJSON, publisher, stock });
    } catch (error) {
        console.error('책 추가 중 오류 발생:', error);
        res.status(500).json({ message: '서버 오류 발생' });
    }
});
// 제거
app.delete("/books/:idKey", (req, res) => {
    const { idKey } = req.params;
    db.query(
        "DELETE FROM books WHERE idKey = ?",
        [idKey],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Book not found" });
            }
            res.json({ message: "Book deleted" });
        }
    )
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Backend running on port" + PORT);
});
