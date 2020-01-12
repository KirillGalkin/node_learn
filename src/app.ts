import express from "express";
import { userCollection } from "./collection";

const app = express();

app.get("/users", async (req, res) => {
  const users = await userCollection.findAll();
  res.send(users);
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userCollection.findOne(id);
  res.send(user);
});

app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userCollection.delete(id);
  res.send(user);
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
