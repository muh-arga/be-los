const db = require("../database/prisma/index");
const joi = require("joi");
const { insert } = require("./patientController");

module.exports = {
  getRoom: async (req, res) => {
    try {
      const status = req.query.status ? parseInt(req.query.status) : undefined;

      const rooms = await db.bed.groupBy({
        by: ["room"],
        where: { ...(status !== undefined && { status }) },
        _count: {
          bed: true,
        },
        _sum: {
          status: true,
        },
        orderBy: {
          room: "asc",
        },
      });
      return res.status(200).json({ message: "Success get room", data: rooms });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getBedByRoom: async (req, res) => {
    try {
      const beds = await db.bed.findMany({
        where: { room: req.params.room, status: 0 },
        orderBy: { bed: "asc" },
      });
      return res.status(200).json({ message: "Success get bed", data: beds });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const room = req.query.room;
      const status = req.query.status ? parseInt(req.query.status) : undefined;

      const beds = await db.bed.findMany({
        where: {
          ...(room && { room }),
          ...(status !== undefined && { status }),
        },
        orderBy: [{ room: "asc" }, { bed: "asc" }],
        include: {
          los: {
            where: { status: 0 },
            orderBy: { createdAt: "desc" },
            include: {
              patient: true,
            },
          },
        },
      });
      return res.status(200).json({ message: "Success get bed", data: beds });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const bed = await db.bed.findUnique({
        where: { id: req.params.id },
      });

      if (!bed) {
        return res.status(404).json({ message: "Bed not found" });
      }

      return res.status(200).json({ message: "Success get bed", data: bed });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  insert: async (req, res) => {
    try {
      if (!Array.isArray(req.body.bed)) req.body.bed = [req.body.bed];

      const validate = (data) => {
        const schema = joi.object({
          room: joi.string().required(),
          bed: joi.array().required(),
        });
        return schema.validate(data);
      };

      const { error, value } = validate(req.body);

      if (error) {
        let message = error.details[0].message.split('"');
        message = message[1] + message[2];
        return res.status(400).json({ message });
      }

      const inputData = req.body.bed.map((item) => {
        return {
          room: req.body.room,
          bed: item,
        };
      });

      const bed = await db.bed.createMany({
        data: inputData,
      });

      return res.status(201).json({ message: "Success insert bed", data: bed });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const validate = (data) => {
        const schema = joi.object({
          room: joi.string().optional(),
          bed: joi.string().optional(),
        });
        return schema.validate(data);
      };

      const { error, value } = validate(req.body);

      if (error) {
        let message = error.details[0].message.split('"');
        message = message[1] + message[2];
        return res.status(400).json({ message });
      }

      let bed = "";

      if (req.body.room) {
        bed = await db.bed.update({
          where: { room: req.body.room },
          data: {
            room: req.body.room,
          },
        });
      } else {
        bed = await db.bed.update({
          where: { id: req.params.id },
          data: {
            bed: req.body.bed,
          },
        });
      }

      return res.status(200).json({ message: "Success update bed", data: bed });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  destroy: async (req, res) => {
    try {
      const bed = await db.bed.delete({
        where: { id: req.params.id },
      });
      return res.status(200).json({ message: "Success delete bed", data: bed });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
