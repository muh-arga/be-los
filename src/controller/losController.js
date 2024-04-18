const db = require("../database/prisma/index");
const joi = require("joi");
const moment = require("moment");

module.exports = {
  addLos: async (req, res) => {
    try {
      const validate = (data) => {
        const schema = joi.object({
          patientId: joi.string().required(),
          numProcEvents: joi.number().required(),
          numNotes: joi.number().required(),
          numLabs: joi.number().required(),
          numCharEvents: joi.number().required(),
          numDiagnosis: joi.number().required(),
          totalNumInteract: joi.number().required(),
          numProcs: joi.number().required(),
          numCallouts: joi.number().required(),
          numMicroLabs: joi.number().required(),
          numInput: joi.number().required(),
          numOutput: joi.number().required(),
          numCPevents: joi.number().required(),
          numTransfers: joi.number().required(),
          numRX: joi.number().required(),
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
          numProcEvents: req.body.numProcEvents,
          numNotes: req.body.numNotes,
          numLabs: req.body.numLabs,
          numCharEvents: req.body.numCharEvents,
          numDiagnosis: req.body.numDiagnosis,
          totalNumInteract: req.body.totalNumInteract,
          numProcs: req.body.numProcs,
          numCallouts: req.body.numCallouts,
          numMicroLabs: req.body.numMicroLabs,
          numInput: req.body.numInput,
          numOutput: req.body.numOutput,
          numCPevents: req.body.numCPevents,
          numTransfers: req.body.numTransfers,
          numRX: req.body.numRX,
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
};
