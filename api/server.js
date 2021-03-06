const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors(""));
server.use(express.json());

server.get("/", (req, res) => res.send("Welcome to Noahs-Arg-Server!"));

const usersRoutes = require("./routes/users");
server.use("/users", usersRoutes);

const authRoutes = require('./routes/auth');
server.use('/auth', authRoutes);

module.exports = server;
