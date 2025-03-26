const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewAuthor = async (req, res) => {
  try {
    const { user_id, is_approved, is_editor } = req.body;
    const newAuthor = await pool.query(
      `INSERT INTO authors (user_id, is_approved, is_editor) VALUES ($1, $2, $3) RETURNING *`,
      [user_id, is_approved, is_editor]
    );
    res.status(201).send({
      message: "Yangi muallif qo'shildi",
      author: newAuthor.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await pool.query(`SELECT * FROM authors`);
    res.status(200).send({
      message: "Barcha mualliflar ro'yxati",
      authors: authors.rows,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    const author = await pool.query(`SELECT * FROM authors WHERE id=$1`, [id]);
    res.status(200).send({
      message: `${id} ID li muallif ma'lumotlari`,
      author: author.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    const { user_id, is_approved, is_editor } = req.body;
    const updatedAuthor = await pool.query(
      `UPDATE authors SET user_id=$1, is_approved=$2, is_editor=$3 WHERE id=$4 RETURNING *`,
      [user_id, is_approved, is_editor, id]
    );
    res.status(200).send({
      message: `${id} ID li muallif yangilandi`,
      author: updatedAuthor.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedAuthor = await pool.query(
      `DELETE FROM authors WHERE id=$1 RETURNING *`,
      [id]
    );
    res.status(200).send({
      message: `${id} ID li muallif o'chirildi`,
      author: deletedAuthor.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
};