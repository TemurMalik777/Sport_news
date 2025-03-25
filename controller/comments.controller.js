const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewComment = async (req, res) => {
  try {
    const { user_id, news_id, content, reply_comment_id } = req.body;
    const newComment = await pool.query(
      `INSERT INTO comments(user_id, news_id, content, reply_comment_id) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, news_id, content, reply_comment_id]
    );
    res.status(201).send({ message: "Yangi izoh qo'shildi", comment: newComment.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await pool.query("SELECT * FROM comments");
    res.status(200).send({ message: "Barcha izohlar", comments: comments.rows });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getCommentById = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await pool.query("SELECT * FROM comments WHERE id=$1", [id]);
    res.status(200).send({ message: `${id} ID li izoh`, comment: comment.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCommentById = async (req, res) => {
  try {
    const id = req.params.id;
    const { content, is_approved, is_deleted, views, likes } = req.body;
    const updatedComment = await pool.query(
      `UPDATE comments SET content=$1, is_approved=$2, is_deleted=$3, views=$4, likes=$5 WHERE id=$6 RETURNING *`,
      [content, is_approved, is_deleted, views, likes, id]
    );
    res.status(200).send({ message: `${id} ID li izoh yangilandi`, comment: updatedComment.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCommentById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedComment = await pool.query("DELETE FROM comments WHERE id=$1 RETURNING *", [id]);
    res.status(200).send({ message: `${id} ID li izoh o'chirildi`, comment: deletedComment.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
