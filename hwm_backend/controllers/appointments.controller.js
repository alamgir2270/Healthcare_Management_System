const { Appointment } = require("../models");

exports.getAppointments = async (req, res) => {
  const list = await Appointment.findAll();
  res.json({ success: true, data: list });
};

exports.createAppointment = async (req, res) => {
  const a = await Appointment.create(req.body);
  res.status(201).json({ success: true, data: a });
};

exports.updateAppointment = async (req, res) => {
  const a = await Appointment.findByPk(req.params.id);
  if (!a) return res.status(404).json({ message: "Not found" });

  await a.update(req.body);
  res.json({ success: true, data: a });
};

exports.deleteAppointment = async (req, res) => {
  const a = await Appointment.findByPk(req.params.id);
  if (!a) return res.status(404).json({ message: "Not found" });

  await a.destroy();
  res.json({ success: true, message: "Deleted" });
};
