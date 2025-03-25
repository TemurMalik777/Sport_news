const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewNews = async (req, res) => {
  try {
    const {
      news_id,
      category_id,
      author_id,
      status,
      published_at,
      source,
      lang_id,
    } = req.body;
    const newNews = await pool.query(
      `INSERT INTO news(news_id, category_id, author_id, status, published_at, source, lang_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [news_id, category_id, author_id, status, published_at, source, lang_id]
    );
    res
      .status(201)
      .send({ message: "Yangi yangilik qo'shildi", news: newNews.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllNews = async (req, res) => {
  try {
    const news = await pool.query(`SELECT * FROM news`);
    res.status(200).send({ message: "Barcha yangiliklar", news: news.rows });
  } catch (error) {
    console.log(error);
  }
};

const getNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const news = await pool.query(`SELECT * FROM news WHERE id=$1`, [id]);
    res
      .status(200)
      .send({ message: `${id} ID li yangilik`, news: news.rows[0] });
  } catch (error) {
    console.log(error);
  }
};

const deleteNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedNews = await pool.query(
      `DELETE FROM news WHERE id=$1 RETURNING *`,
      [id]
    );
    res
      .status(200)
      .send({
        message: `${id} ID li yangilik o'chirildi`,
        news: deletedNews.rows[0],
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addNewNews,
  getAllNews,
  getNewsById,
  deleteNewsById,
};
