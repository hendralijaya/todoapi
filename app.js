const express = require("express");
const app = express();
const listRoutes = require("./routes/listRoutes");

// Middleware untuk parsing json
app.use(express.json());

// Home
app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/list", listRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
