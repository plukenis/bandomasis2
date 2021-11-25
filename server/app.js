// Express serverio instaliavimas
const express = require("express");
const app = express();
const port = 3003;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Nodedemon atnaujina serveri
// SQL tiltas tarp serverio ir mysql
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "bandomasis2",
  password: "root",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// Cors kad teisingus headerius issiustu
const cors = require("cors");
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Routeris - nusakomas kelias kas turi ivykti kai narsykle kreipsis ir ka serveris atsakys

// app.get("/labas/:id", (req, res) => {
//   res.send(`labas tau ${req.params.id} `);
// });
// app.get("/test", (req, res) => {
//   res.send(JSON.stringify({ test: "OK" }));
// });
//   -------------------------------------------------------------------------------

// Read node
app.get("/cows", (req, res) => {
  const sql = `
    SELECT *
    FROM cows
    `;
  con.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

//Delete node
app.delete("/cows/:id", (req, res) => {
  const sql = `
        DELETE FROM cows
        WHERE id = ?
        `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// Edit Node
app.put("/cows/:id", (req, res) => {
  const sql = `
      UPDATE cows
      SET name = ?, weight = ?, total_milk = ?, last_milking_time = ?, one_day_milk = ?
      WHERE id = ?
  `;
  con.query(
    sql,
    [
      req.body.name,
      req.body.weight,
      req.body.total_milk,
      parseFloat(req.body.last_milking_time) +
        parseFloat(req.body.one_day_milk),
      req.body.one_day_milk,
      req.params.id,
    ],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});

// Create node
app.post("/cows", (req, res) => {
  const sql = `
      INSERT INTO cows
      (name, weight, total_milk, last_milking_time, one_day_milk)
      VALUES (?, ?, ?, ?, ?)
  `;
  con.query(
    sql,
    [
      req.body.name,
      req.body.weight,
      req.body.total_milk,
      req.body.last_milking_time,
      req.body.one_day_milk,
    ],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});
