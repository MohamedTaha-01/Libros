const router = require("express").Router();

module.exports = function (db) {
  router
    .route("/")
    // GET /books
    .get(async (req, res) => {
      try {
        // get books
        const querySnapshot = await db.collection("books").get();
        const books = querySnapshot.docs.map((book) => ({
          id: book.id,
          ...book.data(),
        }));
        res.json(books);
      } catch (error) {
        res.status(400).send(error.message);
      }
      // return books
    })
    // POST /books
    .post(async (req, res) => {
      try {
        // validation
        const { title, author } = req.body;
        if (title === undefined || title === "") {
          throw new Error("Título no válido");
        }
        if (author === undefined || author === "") {
          throw new Error("Autor no válido");
        }
        // add book to db
        await db.collection("books").add({
          title,
          author,
        });
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
      res.json({ msg: "ok" });
    });

  router
    .route("/:id")
    // GET /books/:id
    .get(async (req, res) => {
      try {
        const book = await db.collection("books").doc(req.params.id).get();
        res.json(book.data());
      } catch (error) {
        res.status(400).send(error.message);
      }
    })
    // PUT /books/:id
    .put(async (req, res) => {
      try {
        const { title, author } = req.body;
        await db
          .collection("books")
          .doc(req.params.id)
          .update({ title, author });
      } catch (error) {
        res.status(400).send(error.message);
      }
      res.send("ok");
    })
    // DELETE /books/:id
    .delete(async (req, res) => {
      try {
        await db.collection("books").doc(req.params.id).delete();
      } catch (error) {
        res.status(400).send(error.message);
      }
      res.send("ok");
    });

  return router;
};
