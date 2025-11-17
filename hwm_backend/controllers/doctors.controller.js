const { Doctor, User } = require("../models");

exports.getAllDoctors = async (req, res) => {
  const doctors = await Doctor.findAll({
    include: [{ model: User, attributes: ["email", "name"] }],
  });
  res.json({ success: true, data: doctors });
};

exports.getDoctor = async (req, res) => {
  const doctor = await Doctor.findByPk(req.params.id);
  if (!doctor)
    return res.status(404).json({ success: false, message: "Doctor not found" });
  res.json({ success: true, data: doctor });
};
