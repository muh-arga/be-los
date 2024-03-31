const db = require("../database/prisma/index");
const joi = require("joi");

module.exports = {
  insert: async (req, res) => {
    try {
      const validate = (data) => {
        const schema = joi.object({
          name: joi.string().required(),
          nik: joi.string().required(),
          gender: joi.string().required(),
          birthPlace: joi.string().required(),
          birthDate: joi.date().required(),
          address: joi.string().required(),
        });
        return schema.validate(data);
      };

      const { error, value } = validate(req.body);

      if (error) {
        let message = error.details[0].message.split('"');
        message = message[1] + message[2];
        return res.status(400).json({ message });
      }

      const patient = await db.patient.create({
        data: {
          name: req.body.name,
          nik: req.body.nik,
          gender: req.body.gender,
          birthPlace: req.body.birthPlace,
          birthDate: req.body.birthDate,
          address: req.body.address,
        },
      });

      return res
        .status(201)
        .json({ message: "Success create patient", data: patient });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const validate = (data) => {
        const schema = joi.object({
          name: joi.string().required(),
          nik: joi.string().required(),
          gender: joi.string().required(),
          birthPlace: joi.string().required(),
          birthDate: joi.date().required(),
          address: joi.string().required(),
        });
        return schema.validate(data);
      };

      const { error, value } = validate(req.body);

      if (error) {
        let message = error.details[0].message.split('"');
        message = message[1] + message[2];
        return res.status(400).json({ message });
      }

      const patient = await db.patient.update({
        where: { id: req.params.id },
        data: {
          name: req.body.name,
          nik: req.body.nik,
          gender: req.body.gender,
          birthPlace: req.body.birthPlace,
          birthDate: req.body.birthDate,
          address: req.body.address,
        },
      });

      return res
        .status(200)
        .json({ message: "Success update patient", data: patient });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const patients = await db.patient.findMany();
      return res
        .status(200)
        .json({ message: "Success get patient", data: patients });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const patient = await db.patient.findUnique({
        where: { id: req.params.id },
      });

      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }

      return res
        .status(200)
        .json({ message: "Success get patient", data: patient });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const patient = await db.patient.delete({
        where: { id: req.params.id },
      });

      return res
        .status(200)
        .json({ message: "Success delete patient", data: patient });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
