import express from "express";
import { userCollection } from "./collection";
import { handler } from "./utils/api";

const app = express();

const getAllUsers = async (req: express.Request) => {
  const users = await userCollection.findAll();
  return users;
};

app.get("/users", handler(getAllUsers));

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
