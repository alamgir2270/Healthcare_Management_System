const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const { getAllPatients, getPatient } = require("../controllers/patients.controller");

router.get("/", auth, role(["doctor", "admin"]), getAllPatients);
router.get("/:id", auth, getPatient);

module.exports = router;
