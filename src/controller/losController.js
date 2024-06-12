const db = require("../database/prisma/index");
const joi = require("joi");
const moment = require("moment");
const axios = require("axios");

module.exports = {
  addLos: async (req, res) => {
    try {
      const validate = (data) => {
        const schema = joi.object({
          patientId: joi.string().required(),
          NumTransfers: joi.number().required(),
          NumDiagnosis: joi.number().required(),
          NumNotes: joi.number().required(),
          NumLabs: joi.number().required(),
          TotalNumInteract: joi.number().required(),
          NumChartEvents: joi.number().required(),
          NumProcs: joi.number().required(),
          NumMicroLabs: joi.number().required(),
          NumInput: joi.number().required(),
          NumRx: joi.number().required(),
          NumOutput: joi.number().required(),
          NumCPTevents: joi.number().required(),
          NumCallouts: joi.number().required(),
          bedId: joi.string().optional(),
          estimate: joi.number().optional(),
        });
        return schema.validate(data);
      };

      const { error, value } = validate(req.body);

      if (error) {
        let message = error.details[0].message.split('"');
        message = message[1] + message[2];
        return res.status(400).json({ message });
      }

      const patient = await db.patient.findUnique({
        where: {
          id: req.body.patientId,
        },
      });

      const age = moment().diff(patient.birthDate, "years");

      const los = await db.los.create({
        data: {
          patientId: req.body.patientId,
          staffId: req.user.id,
          age: age,
          startDate: new Date(),
          NumTransfers: req.body.NumTransfers,
          NumDiagnosis: req.body.NumDiagnosis,
          NumNotes: req.body.NumNotes,
          NumLabs: req.body.NumLabs,
          TotalNumInteract: req.body.TotalNumInteract,
          NumChartEvents: req.body.NumChartEvents,
          NumProcs: req.body.NumProcs,
          NumMicroLabs: req.body.NumMicroLabs,
          NumInput: req.body.NumInput,
          NumRx: req.body.NumRx,
          NumOutput: req.body.NumOutput,
          NumCPTevents: req.body.NumCPTevents,
          NumCallouts: req.body.NumCallouts,
          bedId: req.body.bedId,
          estimate: req.body.estimate,
        },
      });

      if (req.body.bedId) {
        await db.bed.update({
          where: {
            id: req.body.bedId,
          },
          data: {
            status: 1,
          },
        });
      }

      return res.status(201).json({ message: "Success create los", data: los });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const validate = (data) => {
        const schema = joi.object({
          estimate: joi.number().optional(),
          actual: joi.number().optional(),
          bedId: joi.string().optional(),
          status: joi.number().optional(),
        });
        return schema.validate(data);
      };

      const { error, value } = validate(req.body);

      if (error) {
        let message = error.details[0].message.split('"');
        message = message[1] + message[2];
        return res.status(400).json({ message });
      }

      const endDate = req.body.status == 1 ? new Date() : null;
      const bedStatus = req.body.status == 1 ? 0 : 1;

      const los = await db.los.update({
        where: {
          id: req.params.id,
        },
        data: {
          estimate: req.body.estimate,
          actual: req.body.actual,
          bedId: req.body.bedId,
          status: req.body.status,
          endDate: endDate,
        },
        include: {
          bed: true,
        },
      });

      let bed = los.bed.id;

      if (req.body.bedId) {
        bed = req.body.bedId;
        bedStatus = 1;
      }

      await db.bed.update({
        where: {
          id: bed,
        },
        data: {
          status: bedStatus,
        },
      });

      return res.status(200).json({ message: "Success update los", data: los });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const los = await db.los.findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          patient: true,
          staff: true,
          bed: true,
        },
      });

      if (!los) {
        return res.status(404).json({ message: "Los not found" });
      } else {
        return res.status(200).json({ data: los });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  predict: async (req, res) => {
    try {
      const validate = (data) => {
        const schema = joi.object({
          patientId: joi.string().required(),
          NumTransfers: joi.number().required(),
          NumDiagnosis: joi.number().required(),
          NumNotes: joi.number().required(),
          NumLabs: joi.number().required(),
          TotalNumInteract: joi.number().required(),
          NumChartEvents: joi.number().required(),
          NumProcs: joi.number().required(),
          NumMicroLabs: joi.number().required(),
          NumInput: joi.number().required(),
          NumRx: joi.number().required(),
          NumOutput: joi.number().required(),
          NumCPTevents: joi.number().required(),
          NumCallouts: joi.number().required(),
        });
        return schema.validate(data);
      };

      const { error, value } = validate(req.body);

      if (error) {
        let message = error.details[0].message.split('"');
        message = message[1] + message[2];
        return res.status(400).json({ message });
      }

      const patient = await db.patient.findUnique({
        where: {
          id: req.body.patientId,
        },
      });

      const age = moment().diff(patient.birthDate, "years");

      axios
        .post("http://127.0.0.1:5000/predict", {
          input: [
            req.body.NumTransfers,
            req.body.NumDiagnosis,
            req.body.NumNotes,
            req.body.NumLabs,
            req.body.TotalNumInteract,
            req.body.NumChartEvents,
            req.body.NumProcs,
            req.body.NumMicroLabs,
            req.body.NumInput,
            req.body.NumRx,
            req.body.NumOutput,
            age,
            req.body.NumCPTevents,
            req.body.NumCallouts,
          ],
        })
        .then((response) => {
          return res.status(200).json({ data: response.data });
        })
        .catch((error) => {
          return res.status(500).json({ message: error.message });
        });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
