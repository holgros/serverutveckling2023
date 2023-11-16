let express = require("express"); // installera express
let app = express(); // skapa ett express server-objekt
let port = 8080; // ... som körs på port 8080

let httpServer = app.listen(port, function () {
  console.log(`Webbserver körs på port ${port}`); // samma som "Webbserver körs på port " + port
});

app.use(express.urlencoded({ extended: true })); // behövs för att processa data som skickats med POST

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/template.html");
});

let fs = require("fs");

app.post("/", function (req, res) {
  let html = fs.readFileSync("template.html").toString();
  html = html.replace("***NAME***", req.body.namn);
  res.send(html);
});
