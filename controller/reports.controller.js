const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewReport = async (req, res) => {
  try {
    const { user_id, news_id, reason, status } = req.body;
    const newReport = await pool.query(
      `INSERT INTO reports(user_id, news_id, reason, status) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, news_id, reason, status]
    );
    res.status(201).send({ message: "Yangi report qo'shildi", report: newReport.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await pool.query("SELECT * FROM reports");
    res.status(200).send({ message: "Barcha reportlar", reports: reports.rows });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getReportById = async (req, res) => {
  try {
    const id = req.params.id;
    const report = await pool.query("SELECT * FROM reports WHERE id=$1", [id]);
    res.status(200).send({ message: `${id} ID li report`, report: report.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateReportById = async (req, res) => {
  try {
    const id = req.params.id;
    const { reason, status } = req.body;
    const updatedReport = await pool.query(
      `UPDATE reports SET reason=$1, status=$2 WHERE id=$3 RETURNING *`,
      [reason, status, id]
    );
    res.status(200).send({ message: `${id} ID li report yangilandi`, report: updatedReport.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteReportById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedReport = await pool.query("DELETE FROM reports WHERE id=$1 RETURNING *", [id]);
    res.status(200).send({ message: `${id} ID li report o'chirildi`, report: deletedReport.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewReport,
  getAllReports,
  getReportById,
  updateReportById,
  deleteReportById,
};
