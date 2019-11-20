const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const users = require("./routes/api/users");
const events = require("./routes/api/events");
const posts = require("./routes/api/posts");
const chats = require("./routes/api/chats");
const reservations = require("./routes/api/reservations");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World!!"));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/events", events);
app.use("/api/posts", posts);
app.use("/api/chats", chats);
app.use("/api/reservations", reservations);

io.on('connection', () =>{
 console.log('a user is connected');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
