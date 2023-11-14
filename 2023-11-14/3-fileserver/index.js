let express = require("express");
let app = express();
app.listen(3000);
console.log("Servern körs på port 3000.");

app.get("/", function (req, res) {
  res.send("Välkommen till rotsidan.");
});

// filhantering
let fs = require("fs"); // importera fs (fileserver)
app.get("/filhantering", function (req, res) {
  data = fs.readFileSync("data.txt"); // läs från fil
  res.set({ "content-type": "text/html; charset=utf8" }); // specificera att output är HTML och UTF8 (så att vi kan läsa åäö osv.)
  res.write("Läser in text från fil:<br>");
  res.write(data); // skriv till output
  res.send(); // skicka output till klient (webbläsare)
});
