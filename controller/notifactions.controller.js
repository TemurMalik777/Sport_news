const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewNotification = async (req, res) => {
  try {
    const { user_id, news_id, msg_type, is_checked } = req.body;
    const newNotification = await pool.query(
      `INSERT INTO notifications(user_id, news_id, msg_type, is_checked, created_at) 
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [user_id, news_id, msg_type, is_checked]
    );
    res.status(201).send({
      message: "Yangi bildirishnoma qo'shildi",
      notification: newNotification.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await pool.query(`SELECT * FROM notifications`);
    res.status(200).send({ message: "Barcha bildirishnomalar", notifications: notifications.rows });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getNotificationById = async (req, res) => {
  try {
    const id = req.params.id;
    const notification = await pool.query(`SELECT * FROM notifications WHERE id=$1`, [id]);
    res.status(200).send({ message: `${id} ID li bildirishnoma`, notification: notification.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateNotificationById = async (req, res) => {
  try {
    const id = req.params.id;
    const { user_id, news_id, msg_type, is_checked } = req.body;
    const updatedNotification = await pool.query(
      `UPDATE notifications SET user_id=$1, news_id=$2, msg_type=$3, is_checked=$4 WHERE id=$5 RETURNING *`,
      [user_id, news_id, msg_type, is_checked, id]
    );
    res.status(200).send({
      message: `${id} ID li bildirishnoma yangilandi`,
      notification: updatedNotification.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteNotificationById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedNotification = await pool.query(
      `DELETE FROM notifications WHERE id=$1 RETURNING *`,
      [id]
    );
    res.status(200).send({
      message: `${id} ID li bildirishnoma o'chirildi`,
      notification: deletedNotification.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewNotification,
  getAllNotifications,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
};
