// kolla att serverskriptet körs
console.log("Kör serverskript med NodeJS!");

// starta en väldigt enkel webbserver med NodeJS
let http = require("http");
http
  .createServer(function (req, res) {
    console.log("Någon laddade webbsidan.");
    res.end("Hello world!");
  })
  .listen(8080);
console.log("Servern körs på port 8080.");
