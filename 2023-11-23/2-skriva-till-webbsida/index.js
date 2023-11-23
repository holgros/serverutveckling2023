// Skriv ut databastabellens innehåll på en webbsida
// Börja med att starta webbservern och definiera en route (som vi gjort flera gånger tidigare)
let mysql = require("mysql"); // installera med kommandot "npm install" som vanligt
const express = require("express");
const fs = require("fs");
const app = express();
app.listen(3000);
console.log("Webbservern körs på port 3000.");
app.get("/", function (req, res) {
  // skicka query till databasen - se tidigare exempel
  con = mysql.createConnection({
    host: "localhost", // IP-adress till databas-servern
    user: "root", // standard-användarnamn till XAMPPs databas
    password: "", // standardlösenord
    database: "jensen2023", // ÄNDRA TILL NAMN PÅ DIN DATABAS
  });
  con.connect(function (err) {
    if (err) throw err;
    console.log("Uppkopplad till databas!");
    con.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;

      // Exempel 1: Skriv ut resultatet direkt
      //res.send(result);

      // Exempel 2: Skriv ut som enkel HTML
      let output = "";
      for (let user of result) {
        // loopa igenom varje rad i databastabellen
        for (let key in user) {
          // loopa igenom varje kolumn i raden
          output += `${key}: ${user[key]}, `;
        }
        output += "<br>";
      }
      //res.send(output);

      // Exempel 3: Skriv ut med en HTML-mall
      fs.readFile("mall.html", "utf-8", function (err, data) {
        if (err) throw err;
        let htmlArray = data.split("***NODE***"); // splitta HTML-koden i tre delar
        let output = htmlArray[0];
        for (let key in result[0]) {
          output += `<th>${key}</th>`;
        }
        output += htmlArray[1];
        for (let user of result) {
          output += "<tr>";
          for (let key in user) {
            output += `<td>${user[key]}</td>`;
          }
          output += "</tr>";
        }
        output += htmlArray[2];
        res.send(output);
      });
    });
  });
});
