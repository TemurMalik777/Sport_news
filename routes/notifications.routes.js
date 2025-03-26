const {
  addNewNotification,
  getAllNotifications,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
} = require("../controller/notifactions.controller");

const routes = require("express").Router();

routes.post("/", addNewNotification);
routes.get("/", getAllNotifications);
routes.get("/:id", getNotificationById);
routes.put("/:id", updateNotificationById);
routes.delete("/:id", deleteNotificationById);


module.exports = routes