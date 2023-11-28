let express = require("express"); // INSTALLERA MED "npm install express" I KOMMANDOTOLKEN
let app = express();
app.listen(3000);
console.log("Servern körs på port 3000");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/dokumentation.html");
});

const mysql = require("mysql"); // INSTALLERA MED "npm install mysql" I KOMMANDOTOLKEN
con = mysql.createConnection({
  host: "localhost", // databas-serverns IP-adress
  user: "root", // standardanvändarnamn för XAMPP
  password: "", // standardlösenord för XAMPP
  database: "jensen2023", // ÄNDRA TILL NAMN PÅ ER EGEN DATABAS
  multipleStatements: true, // OBS: måste tillåta att vi kör flera sql-anrop i samma query
});

app.use(express.json()); // för att läsa data från klient och för att skicka svar (ersätter bodyparser som vi använt någon gång tidigare)

app.post("/users", function (req, res) {
  // kod för att validera input
  if (!req.body.username) {
    res.status(400).send("username required!");
    return; // avslutar metoden
  }
  let fields = ["username", "password", "name", "email"]; // ändra eventuellt till namn på er egen databastabells kolumner
  for (let key in req.body) {
    if (!fields.includes(key)) {
      res.status(400).send("Unknown field: " + key);
      return; // avslutar metoden
    }
  }
  // kod för att hantera anrop
  let sql = `INSERT INTO users (username, password, name, email)
    VALUES ('${req.body.username}', 
    '${req.body.password}',
    '${req.body.name}',
    '${req.body.email}');
    SELECT LAST_INSERT_ID();`; // OBS: innehåller två query: ett insert och ett select
  console.log(sql);

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    // kod för att hantera retur av data
    console.log(result);
    let output = {
      id: result[0].insertId,
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
    };
    res.send(output);
  });
});
