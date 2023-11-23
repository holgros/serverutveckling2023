// koppla upp till databas, https://www.w3schools.com/nodejs/nodejs_mysql.asp
let mysql = require("mysql"); // installera med kommandot "npm install" som vanligt

let con = mysql.createConnection({
  host: "localhost", // IP-adress till databas-servern
  user: "root", // standard-användarnamn till XAMPPs databas
  password: "", // standardlösenord
  database: "jensen2023", // ÄNDRA TILL NAMN PÅ DIN DATABAS
});

con.connect(function (err) {
  if (err) throw err; // felhantering
  console.log("Uppkopplad till databas!");
  // skicka query, https://www.w3schools.com/nodejs/nodejs_mysql_select.asp
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err; // felhantering
    console.log(result); // skriv ut innehållet i databasen till kommandotolken
    // hantera enstaka objekt och attribut, t.ex.:
    console.log(result[0]); // skriver ut första raden (objektet) i tabellen
    console.log(result[0].name); // skriver ut attributet "name" (förutsatt att detta finns - ändra om din tabell ser annorlunda ut)
  });
  // stäng uppkopplingen, kan vara önskvärt ifall man inte vill tvångsavsluta programmet i konsolen
  con.end(function (err) {
    if (err) throw err; // felhantering
    console.log("Stänger uppkopplingen.");
  });
});
