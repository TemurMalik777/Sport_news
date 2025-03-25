const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      is_active,
      interests,
      bookmarks,
    } = req.body;
    const newUser = await pool.query(
      `INSERT INTO users(first_name, last_name, email, password, role, is_active, created_at, interests, bookmarks) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7, $8) RETURNING *`,
      [
        first_name,
        last_name,
        email,
        password,
        role,
        is_active,
        interests,
        bookmarks,
      ]
    );
    res.status(201).send({
      message: "Yangi foydalanuvchi qo'shildi",
      user: newUser.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await pool.query(`SELECT * FROM users`);
    res
      .status(200)
      .send({ message: "Barcha foydalanuvchilar", users: users.rows });
  } catch (error) {
    errorHandler(error, res)
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    res
      .status(200)
      .send({ message: `${id} ID li foydalanuvchi`, user: user.rows[0] });
  } catch (error) {
    errorHandler(error, res)
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      is_active,
      interests,
      bookmarks,
    } = req.body;
    const updatedUser = await pool.query(
      `UPDATE users SET first_name=$1, last_name=$2, email=$3, password=$4, role=$5, is_active=$6, interests=$7, bookmarks=$8 WHERE id=$9 RETURNING *`,
      [
        first_name,
        last_name,
        email,
        password,
        role,
        is_active,
        interests,
        bookmarks,
        id,
      ]
    );
    res
      .status(200)
      .send({
        message: `${id} ID li foydalanuvchi yangilandi`,
        user: updatedUser.rows[0],
      });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await pool.query(
      `DELETE FROM users WHERE id=$1 RETURNING *`,
      [id]
    );
    res.status(200).send({
      message: `${id} ID li foydalanuvchi o'chirildi`,
      user: deletedUser.rows[0],
    });
  } catch (error) {
    errorHandler(error, res)
  }
};

module.exports = {
  addNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
