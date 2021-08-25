const express = require("express");
const router = express.Router();
const { getAllList, postList, getList, updateList, deleteList } = require("../controllers/handler");

// // Menampilkan seluruh data yang ada di list.json
// app.get("/list", getAllList);
// // Menambah data ke list.json
// app.post("/list", postList);
// // Menampilkan satu data spesifik dari list.json
// app.get("/list/:id", getList);
// // Mengubah satu data spesifik dari list.json
// app.put("/list/:id", updateList);
// // Menghapus satu data spesifik dari list.json
// app.delete("/list/:id", deleteList);

router.route("/").get(getAllList).post(postList);
router.route("/:id").get(getList).put(updateList).delete(deleteList);
module.exports = router;
