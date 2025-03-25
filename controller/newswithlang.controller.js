const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewNewsWithLang = async (req, res) => {
  try {
    const { title, content, summary_news, lang_id } = req.body;
    const newNewsWithLang = await pool.query(
      `INSERT INTO news_with_lang(title, content, summary_news, lang_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, content, summary_news, lang_id]
    );
    res.status(201).send({ message: "Yangi tilga mos yangilik qo'shildi", news: newNewsWithLang.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllNewsWithLang = async (req, res) => {
  try {
    const news = await pool.query(`SELECT * FROM news_with_lang`);
    res.status(200).send({ message: "Barcha tilga mos yangiliklar", news: news.rows });
  } catch (error) {
    console.log(error);
  }
};

const getNewsWithLangById = async (req, res) => {
  try {
    const id = req.params.id;
    const news = await pool.query(`SELECT * FROM news_with_lang WHERE id=$1`, [id]);
    res.status(200).send({ message: `${id} ID li tilga mos yangilik`, news: news.rows[0] });
  } catch (error) {
    console.log(error);
  }
};

const deleteNewsWithLangById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedNews = await pool.query(`DELETE FROM news_with_lang WHERE id=$1 RETURNING *`, [id]);
    res.status(200).send({ message: `${id} ID li tilga mos yangilik o'chirildi`, news: deletedNews.rows[0] });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addNewNewsWithLang,
  getAllNewsWithLang,
  getNewsWithLangById,
  deleteNewsWithLangById,
};