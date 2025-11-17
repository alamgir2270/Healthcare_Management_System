const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const { createPrescription, getPrescription } = require("../controllers/prescriptions.controller");

router.post("/", auth, role(["doctor","admin"]), createPrescription);
router.get("/:id", auth, getPrescription);

module.exports = router;
