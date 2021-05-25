const express = require("express");
const { filter } = require("./data.js");
let data = require("./data.js");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello Express");
});

server.get("/actors", (req, res) => {
  res.status(200).json(data);
});

server.get("/actors/:id", (req, res) => {
  console.log("req.body", req.body);
  const { id } = req.params;
  const actor = data.find((actor) => actor.id === parseInt(id));
  if (actor) {
    res.status(200).json(actor);
  } else {
    res.status(404).send("Nothing found any actor");
  }
});

let newId = 4;

server.post("/actors", (req, res) => {
  let newActor = req.body;
  newActor.id = newId;
  newId++;
  data.push(newActor);

  res.status(201).json(newActor);
});

server.delete("/actors/:id", (req, res) => {
  const id = req.params.id;
  const actors = data.find((actor) => actor.id === parseInt(id));
  if (actors) {
    data = data.filter((actor) => actor.id !== Number(id));
    res.status(204).send();
  } else {
    res.status(404).json({ errorMessage: "Nothing found" });
  }
});

server.put("/actors/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let films = req.body.films;
  let index = data.findIndex((actor) => actor.id === Number(id));
  if (index >= 0) {
    let editActor = data[index];

    editActor.name = name;
    editActor.films = films;

    res.status(200).json(editActor);
  } else {
    res.status(404).json({ errorMessage: "Nothing found" });
  }
});
server.listen(3000, () => {
  console.log("Server is listening from port 3000");
});
