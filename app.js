const express = require("express");
const app = express();
const { nanoid } = require("nanoid");
const { loadList } = require("./handler");

// Middleware untuk parsing json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home");
});

// Menampilkan seluruh data yang ada di list.json
app.get("/list", (req, res) => {
  let lists = loadList();
  res.send(lists);
});

// Menambah data ke list.json
app.post("/list", (req, res) => {
  const { note, desc } = req.body;
  const date = new Date().toISOString();
  const id = nanoid(12);
  const newList = { id, note, desc, date };
  let lists = loadList();
  lists.push(newList);
  res.send(lists);
});

// Menampilkan satu data spesifik dari list.json
app.get("/list/:noteID", (req, res) => {
  let id = req.params.noteID;
  console.log(id);
  let lists = loadList();
  list = lists.filter((list) => list.id === id);
  res.json(list);
});

// Mengubah satu data spesifik dari list.json
app.put("/list/:noteID", (req, res) => {
  let lists = loadList();
  const { note, desc } = req.body;
  const date = new Date().toISOString();
  const id = nanoid(12);
  const index = lists.findIndex((list) => list.id === req.params.noteID);
  const updatedList = (lists[index] = { ...lists[index], id, note, desc, date });
  res.send(updatedList);
});

// Menghapus satu data spesifik dari list.json
app.delete("/list/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  let lists = loadList();
  const newLists = lists.filter((list) => list.id !== id);
  res.send(newLists);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
