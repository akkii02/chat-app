const http = require("http");
const express = require("express");
const loginRoutes = require("./routes/login");

const bodyParser = require('body-parser');
const messageRoute = require('./routes/message')
const app = express();

app.use(bodyParser.urlencoded({ extended:false}))


app.use(loginRoutes);
app.use(messageRoute)
const server = http.createServer(app);
server.listen(3000, () => {
    console.log("localhost 3000 is running...");
});
