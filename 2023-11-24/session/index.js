/*
Sessioner är en teknik för att behålla kontakt mellan klient och server så att man t.ex. inte behöver logga in igen varje gång man byter sida.
Se tutorial på t.ex. https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
*/

// starta express-server
const express = require("express");
const app = express();
const port = 4000;
app.listen(port);
console.log("Webbservern körs på port " + port);

// definiera ett sessionsobjekt som håller koll på användardata
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const sessions = require("express-session");
const oneHour = 1000 * 60 * 60; // en timme = 3600000 millisekunder
app.use(
  sessions({
    secret: "enHemlighetSomIngenKanGissa123!%¤",
    saveUninitialized: true,
    cookie: { maxAge: oneHour },
    resave: false,
  })
);
let session; // behövs för att göra sessionsvariabeln global

// route till rot - visa inloggningsformulär ifall sessionen inte är igång
app.get("/", function (req, res) {
  session = req.session;
  console.log(session);
  if (session && session.userid) {
    res.send(`
    <p>Välkommen ${session.userid}!</p>
    <p><a href='/checksession'>Kolla din session</a></p>
    <p><a href='/logout'>Logga ut</a></p>
            `);
  } else res.sendFile(__dirname + "/login.html");
});

// hantera post-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// användardata, kan även läsas in från fil
let users = [
  { username: "kalleanka", password: "Kvack!" },
  { username: "mussepigg", password: "Osv." },
];

// post-route när man loggar in
app.post("/login", function (req, res) {
  if (loginsuccess(users, req.body.username, req.body.password)) {
    session = req.session;
    session.userid = req.body.username;
    res.redirect("/");
  } else {
    res.send(`
    <p>Inloggningen misslyckades!</p>
    <p><a href='/'>Tillbaka till inloggningssidan</a></p>
            `);
  }
});

// kolla inloggningsuppgifter och returnera true/false
let loginsuccess = function (users, username, password) {
  for (user of users) {
    if (user.username == username && user.password == password) {
      return true;
    }
  }
  return false;
};

// route för att kolla sessionen
app.get("/checksession", function (req, res) {
  if (req.session && req.session.userid) {
    res.send(`
    <p>Du &auml;r inloggad som ${req.session.userid}</p>
    <p><a href='/'>Tillbaka till v&auml;lkomstsidan</a></p>
          `);
  } else
    res.send(`
    <p>Du &auml;r inte inloggad.</p>
    <p><a href='/'>Tillbaka till inloggningssidan</a></p>
            `);
});

app.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});
