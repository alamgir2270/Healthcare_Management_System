const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Patient, Doctor } = require("../models");

exports.register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists)
      return res.status(400).json({ success: false, message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
      name,
      role: role || "patient",
    });

    if (role === "patient") await Patient.create({ userId: user.id });
    if (role === "doctor") await Doctor.create({ userId: user.id });

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
