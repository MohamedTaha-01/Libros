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
        // return books
        res.json(books);
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
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
          title: title.trim(),
          author: author.trim(),
        });
        res.json({ msg: "ok" });
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
    });

  router
    .route("/:id")
    // GET /books/:id
    .get(async (req, res) => {
      try {
        const book = await db.collection("books").doc(req.params.id).get();
        res.json(book.data());
      } catch (error) {
        res.status(400).json({ msg: error.message });
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
        res.json({ msg: "ok" });
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
    })
    // DELETE /books/:id
    .delete(async (req, res) => {
      try {
        await db.collection("books").doc(req.params.id).delete();
        res.json({ msg: "ok" });
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
    });

  return router;
};
