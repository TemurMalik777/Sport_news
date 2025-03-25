const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewLike = async (req, res) => {
  try {
    const { user_id, news_id } = req.body;
    const newLike = await pool.query(
      `INSERT INTO likes(user_id, news_id) VALUES ($1, $2) RETURNING *`,
      [user_id, news_id]
    );
    res.status(201).send({ message: "Yangi like qo'shildi", like: newLike.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllLikes = async (req, res) => {
  try {
    const likes = await pool.query("SELECT * FROM likes");
    res.status(200).send({ message: "Barcha like'lar", likes: likes.rows });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getLikeById = async (req, res) => {
  try {
    const id = req.params.id;
    const like = await pool.query("SELECT * FROM likes WHERE id=$1", [id]);
    res.status(200).send({ message: `${id} ID li like`, like: like.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteLikeById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedLike = await pool.query("DELETE FROM likes WHERE id=$1 RETURNING *", [id]);
    res.status(200).send({ message: `${id} ID li like o'chirildi`, like: deletedLike.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewLike,
  getAllLikes,
  getLikeById,
  deleteLikeById,
};
