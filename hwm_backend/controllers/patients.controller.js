const { Patient, User } = require("../models");

exports.getAllPatients = async (req, res) => {
  const patients = await Patient.findAll({
    include: [{ model: User, attributes: ["email", "name"] }],
  });
  res.json({ success: true, data: patients });
};

exports.getPatient = async (req, res) => {
  const patient = await Patient.findByPk(req.params.id);
  if (!patient)
    return res.status(404).json({ success: false, message: "Patient not found" });
  res.json({ success: true, data: patient });
};
