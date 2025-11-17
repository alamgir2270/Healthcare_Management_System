module.exports = (sequelize, DataTypes) => {
  const Prescription = sequelize.define(
    "Prescription",
    {
      prescription_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      appointment_id: { type: DataTypes.UUID },
      doctor_id: { type: DataTypes.UUID },
      patient_id: { type: DataTypes.UUID },

      meds_summary: { type: DataTypes.TEXT },
      dosage_instructions: { type: DataTypes.TEXT },
      file_url: { type: DataTypes.TEXT },

      issued_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      downloadable_flag: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "prescriptions",
      timestamps: false,
    }
  );

  return Prescription;
};
