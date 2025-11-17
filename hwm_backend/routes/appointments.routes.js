const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointments.controller");

router.get("/", auth, role(["doctor","admin"]), getAppointments);
router.post("/", auth, role("patient"), createAppointment);
router.put("/:id", auth, role(["doctor","admin"]), updateAppointment);
router.delete("/:id", auth, role("admin"), deleteAppointment);

module.exports = router;
