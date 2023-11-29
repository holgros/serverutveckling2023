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

app.use(express.json());

app.post("/users", function (req, res) {
  //data ligger i req.body. Kontrollera att det är korrekt.
  if (isValidUserData(req.body)) {
    //skriv till databas
    //kod här för att hantera anrop...
    let sql = `INSERT INTO users (username, password, name, email)
    VALUES ('${req.body.username}', 
    '${req.body.password}',
    '${req.body.name}',
    '${req.body.email}');
    SELECT LAST_INSERT_ID();`; // OBS: innehåller två query: ett insert och ett select
    console.log(sql);

    con.query(sql, function (err, result, fields) {
      if (err) {
        console.log(err);
        res.status(500).send("Fel i databasanropet!");
        throw err;
      }
      // hantera retur av data
      console.log(result);
      let output = {
        id: result[0].insertId,
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
      };
      res.json(output);
    });
  } else {
    res.status(422).send("username required!"); // eller annat meddelande enligt nedan
  }
});

// funktion för att kontrollera att användardata finns
function isValidUserData(body) {
  return body && body.username; // returnerar true ifall data är OK, false ifall något av attributen är undefined
  /* andra möjligheter (anpassa efter era egna behov):
        - kolla att firstname, lastname och passwd är textsträngar (snarare än tal, fält osv.)
        - kolla att userId är en textsträng med rätt format (fyra bokstäver motsvarande första två i fornamn + efternamn)
        - kolla att passwd uppfyller vanliga kriterier (minimilängd, innehåller olika typer av tecken osv.)
        - (kolla att userId inte redan är upptaget - eventuellt bättre att kolla detta i samband med att man skriver till databasen genom att göra denna kolumn till key i databastabellen)
    */
}
