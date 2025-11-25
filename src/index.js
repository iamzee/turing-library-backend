require('dotenv').config()
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  res.send("OK")
})

app.post("/api/v1/books", async (req, res) => {
  const body = req.body;
  console.log("genres", body.genres.map(genre => ({ id: genre })));
  const result = await prisma.book.create({
    data: {
      title: body.title,
      summary: body.summary,
      isbn: body.isbn,
      url: body.url,
      author: {
        connect: {
          id: body.authorId
        }
      },
      genres: {
        connect: body.genres.map(genre => ({ id: genre }))
      }
    }
  })
  return res.status(201).json(result);
})

app.listen(3001, () => {
  console.log("Server started on port 3000")
});