const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewCategory = async (req, res) => {
  try {
    const { category_name, description, parent_id } = req.body;
    const newCategory = await pool.query(
      `INSERT INTO category(category_name, description, parent_id) VALUES ($1, $2, $3) RETURNING *`,
      [category_name, description, parent_id]
    );
    res
      .status(201)
      .send({
        message: "Yangi kategoriya qo'shildi",
        category: newCategory.rows[0],
      });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await pool.query(`SELECT * FROM category`);
    res
      .status(200)
      .send({ message: "Barcha kategoriyalar", categories: categories.rows });
  } catch (error) {
    console.log(error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await pool.query(`SELECT * FROM category WHERE id=$1`, [
      id,
    ]);
    res
      .status(200)
      .send({ message: `${id} ID li kategoriya`, category: category.rows[0] });
  } catch (error) {
    console.log(error);
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCategory = await pool.query(
      `DELETE FROM category WHERE id=$1 RETURNING *`,
      [id]
    );
    res
      .status(200)
      .send({
        message: `${id} ID li kategoriya o'chirildi`,
        category: deletedCategory.rows[0],
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addNewCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
};
