const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const dbURI = process.env.MONGO_URI || 'mongodb://root:yari@db:27017/utn_devops';
console.log(`Connecting to MongoDB at ${dbURI}`);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

app.use(cors());
const User = mongoose.model('User', userSchema);

app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log('Error fetching users:', err);
      res.status(500).send(err);
    } else {
      res.json(users);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
