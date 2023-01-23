import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("Backend Server Running");
});

//Get all books
app.get("/books", (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

//Post a new book
app.post("/books", (req, res) => {
  const query =
    "INSERT INTO books (`title`,`desc`, `price`,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(query, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json("Book has been created successfully");
  });
});

//Delete a book
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM books WHERE id = ?";

  db.query(query, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json("Book has been deleted successfully");
  });
});

//Update a book
app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const query =
    "UPDATE books SET `title`= ?,`desc` = ?, `price` = ?,`cover` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(query, [...values, id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json("Book has been updated successfully");
  });
});

app.listen(8800, () => {
  console.log("App running on port 8800");
});
