const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewsTag = async (req, res) => {
  try {
    const { news_id, tag_id } = req.body;
    const newNewsTag = await pool.query(
      `INSERT INTO news_tags (news_id, tag_id) VALUES ($1, $2) RETURNING *`,
      [news_id, tag_id]
    );
    res.status(201).send({
      message: "News va Tag bog'landi",
      newsTag: newNewsTag.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllNewsTags = async (req, res) => {
  try {
    const newsTags = await pool.query(`SELECT * FROM news_tags`);
    res.status(200).send({
      message: "Barcha news_tags",
      newsTags: newsTags.rows,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getNewsTagById = async (req, res) => {
  try {
    const id = req.params.id;
    const newsTag = await pool.query(`SELECT * FROM news_tags WHERE id = $1`, [
      id,
    ]);
    res.status(200).send({
      message: `${id} ID li news_tag`,
      newsTag: newsTag.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateNewsTagById = async (req, res) => {
  try {
    const id = req.params.id;
    const { news_id, tag_id } = req.body;
    const updatedNewsTag = await pool.query(
      `UPDATE news_tags SET news_id = $1, tag_id = $2 WHERE id = $3 RETURNING *`,
      [news_id, tag_id, id]
    );
    res.status(200).send({
      message: `${id} ID li news_tag yangilandi`,
      newsTag: updatedNewsTag.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteNewsTagById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedNewsTag = await pool.query(
      `DELETE FROM news_tags WHERE id = $1 RETURNING *`,
      [id]
    );
    res.status(200).send({
      message: `${id} ID li news_tag o'chirildi`,
      newsTag: deletedNewsTag.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewsTag,
  getAllNewsTags,
  getNewsTagById,
  updateNewsTagById,
  deleteNewsTagById,
};
