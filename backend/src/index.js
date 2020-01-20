const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const routes = require("./routes");
const cors = require("cors");
const { setupWebsocket } = require("./websocket");

const port = 3333;
const app = express();
const server = http.Server(app);

setupWebsocket(server);

// Insert yout login : password
mongoose.connect(
  "mongodb+srv://XXXXX:XXXXX@cluster0-upyog.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
