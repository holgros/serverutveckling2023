let express = require("express"); // installera express
let app = express(); // skapa ett express server-objekt
let port = 8080; // ... som körs på port 8080

let httpServer = app.listen(port, function () {
  console.log(`Webbserver körs på port ${port}`); // samma som "Webbserver körs på port " + port
});

app.use(express.urlencoded({ extended: true })); // behövs för att processa data som skickats med POST

let fs = require("fs");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.post("/checklogin", function (req, res) {
  let users = JSON.parse(fs.readFileSync("users.json").toString()); // läs in JSON-fil och konvertera till en array med JavaScript-objekt
  console.log(users);
  for (i in users) {
    if (users[i].user == req.body.user && users[i].pass == req.body.pass) {
      let output = fs.readFileSync("welcome.html").toString();
      output = output.replace("***NAMN***", users[i].name);
      res.send(output);
      return;
    }
  }
  let output = fs.readFileSync("login.html").toString();
  output = output.replace(
    "<body>",
    "<body>LOGIN FAILED! PLEASE TRY AGAIN!<br>"
  );
  res.send(output);
});
