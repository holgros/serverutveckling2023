let express = require("express"); // installera express
let app = express(); // skapa ett express server-objekt
let port = 8080; // ... som körs på port 8080

let httpServer = app.listen(port, function () {
  console.log(`Webbserver körs på port ${port}`); // samma som "Webbserver körs på port " + port
});

// serva en statisk webbsida (form.html) som innehåller formulär
app.get("/form", function (req, res) {
  res.sendFile(__dirname + "/form.html");
});

// hit kommer data när get-formuläret skickas
app.get("/get-route", function (req, res) {
  console.log(req.query);
  let summa = Number(req.query.tal1) + Number(req.query.tal2);
  console.log(summa);
  res.send(`${req.query.tal1}+${req.query.tal2}=${summa}`);
});
