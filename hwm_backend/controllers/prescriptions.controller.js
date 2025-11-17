const { Prescription } = require("../models");

exports.createPrescription = async (req, res) => {
  const p = await Prescription.create(req.body);
  res.status(201).json({ success: true, data: p });
};

exports.getPrescription = async (req, res) => {
  const p = await Prescription.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message: "Not found" });

  res.json({ success: true, data: p });
};
