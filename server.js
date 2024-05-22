const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const dbURI =
  process.env.MONGO_URI || "mongodb://root:example@db:27017/utn_devops";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).send(err);
    res.json(users);
  });
});

app.get("/", (req, res) => {
  res.send("¡Hola Mundo!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
