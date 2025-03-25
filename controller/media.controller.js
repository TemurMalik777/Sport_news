const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewMedia = async (req, res) => {
  try {
    const { news_id, media_type, media_url } = req.body;
    const newMedia = await pool.query(
      `INSERT INTO media(news_id, media_type, media_url, uploaded_at) 
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [news_id, media_type, media_url]
    );
    res
      .status(201)
      .send({ message: "Yangi media qo'shildi", media: newMedia.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllMedia = async (req, res) => {
  try {
    const media = await pool.query("SELECT * FROM media");
    res
      .status(200)
      .send({ message: "Barcha media fayllar", media: media.rows });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getMediaById = async (req, res) => {
  try {
    const id = req.params.id;
    const media = await pool.query("SELECT * FROM media WHERE id=$1", [id]);
    res
      .status(200)
      .send({ message: `${id} ID li media`, media: media.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateMediaById = async (req, res) => {
  try {
    const id = req.params.id;
    const { news_id, media_type, media_url } = req.body;
    const updatedMedia = await pool.query(
      `UPDATE media SET news_id=$1, media_type=$2, media_url=$3 WHERE id=$4 RETURNING *`,
      [news_id, media_type, media_url, id]
    );
    res
      .status(200)
      .send({
        message: `${id} ID li media yangilandi`,
        media: updatedMedia.rows[0],
      });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteMediaById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMedia = await pool.query(
      "DELETE FROM media WHERE id=$1 RETURNING *",
      [id]
    );
    res
      .status(200)
      .send({
        message: `${id} ID li media o'chirildi`,
        media: deletedMedia.rows[0],
      });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewMedia,
  getAllMedia,
  getMediaById,
  updateMediaById,
  deleteMediaById,
};
