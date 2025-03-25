const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewView = async (req, res) => {
  try {
    const { user_id, news_id } = req.body;
    const newView = await pool.query(
      `INSERT INTO views(user_id, news_id) VALUES ($1, $2) RETURNING *`,
      [user_id, news_id]
    );
    res.status(201).send({ message: "Yangi view qo'shildi", view: newView.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllViews = async (req, res) => {
  try {
    const views = await pool.query("SELECT * FROM views");
    res.status(200).send({ message: "Barcha view'lar", views: views.rows });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getViewById = async (req, res) => {
  try {
    const id = req.params.id;
    const view = await pool.query("SELECT * FROM views WHERE id=$1", [id]);
    res.status(200).send({ message: `${id} ID li view`, view: view.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteViewById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedView = await pool.query("DELETE FROM views WHERE id=$1 RETURNING *", [id]);
    res.status(200).send({ message: `${id} ID li view o'chirildi`, view: deletedView.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewView,
  getAllViews,
  getViewById,
  deleteViewById,
};