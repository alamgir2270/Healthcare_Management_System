const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { getAllDoctors, getDoctor } = require("../controllers/doctors.controller");

router.get("/", auth, getAllDoctors);
router.get("/:id", auth, getDoctor);

module.exports = router;
