// Skicka data från webbsidas formulär och skriv till databas
// Börja med att starta webbservern och definiera en route (som vi gjort flera gånger tidigare)
let mysql = require("mysql"); // installera med kommandot "npm install" som vanligt
const express = require("express");
const app = express();
app.listen(3000);
console.log("Webbservern körs på port 3000.");
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/form.html");
});

// definiera en post-route som skriver formulärdata från klienten till databasen
app.use(express.urlencoded({ extended: true })); // behövs för att processa data som skickats med POST
app.post("/", function (req, res) {
  // koppla till databasen - se tidigare exempel
  con = mysql.createConnection({
    host: "localhost", // IP-adress till databas-servern
    user: "root", // standard-användarnamn till XAMPPs databas
    password: "", // standardlösenord
    database: "jensen2023", // ÄNDRA TILL NAMN PÅ DIN DATABAS
  });
  con.connect(function (err) {
    // skriv till databasen
    console.log("Uppkopplad till databas!");
    let sql = `INSERT INTO users (name, username, password, email)
    VALUES ('${req.body.name}', '${req.body.username}', '${req.body.password}', '${req.body.email}')`;
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) console.log(err);
      res.redirect("/"); // gå tillbaka till get-route
    });
  });
});
