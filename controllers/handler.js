const fs = require("fs");
const { nanoid } = require("nanoid");

const saveList = (list) => {
  fs.writeFileSync("./data/list.json", JSON.stringify(list, null, 2));
};

// Mengambil data dari list.json
const loadList = () => {
  const fileBuffer = fs.readFileSync("./data/list.json", "utf-8");
  const lists = JSON.parse(fileBuffer);
  return lists;
};

const getAllList = (req, res) => {
  let lists = loadList();
  res.json(lists);
};

const postList = (req, res) => {
  const { note, desc } = req.body;
  const date = new Date().toISOString();
  const id = nanoid(12);
  if (Boolean(note) == true && Boolean(desc) == true) {
    const newList = { id, note, desc, date };
    let lists = loadList();
    lists.push(newList);
    saveList(lists);
    res.send(lists);
  } else {
    res.status(404).json({
      status: "fail",
      message: "gagal post note atau desc tidak diisi",
    });
  }
};

const getList = (req, res) => {
  let id = req.params.id;
  let lists = loadList();
  list = lists.filter((list) => list.id === id);
  res.json(list);
};

const updateList = (req, res) => {
  let lists = loadList();
  const { note, desc } = req.body;
  const date = new Date().toISOString();
  const id = nanoid(12);
  if (Boolean(note) == true && Boolean(desc) == true) {
    const filteredList = lists.filter((list) => list.id !== req.params.id);
    if (filteredList.length !== lists.length) {
      const updatedList = { id, note, desc, date };
      filteredList.push(updatedList);
      saveList(filteredList);
      res.send(updatedList);
    } else {
      res.status(404).json({
        status: "fail",
        message: "List gagal diperbarui",
      });
    }
  } else {
    return res.status(404).json({
      status: "fail",
      message: "List gagal diperbarui note atau desc tidak terisi",
    });
  }
};

const deleteList = (req, res) => {
  const { id } = req.params;
  let lists = loadList();
  listsLength = lists.length;
  const newLists = lists.filter((list) => list.id !== id);
  if (lists.length === newLists.length) {
    res.json({
      status: "fail",
      message: "gagal menghapus list id tidak ditemukan",
    });
  } else {
    saveList(newLists);
    res.send(newLists);
  }
};

module.exports = { loadList, deleteList, getAllList, postList, getList, updateList };
