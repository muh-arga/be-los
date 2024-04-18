const db = require("../database/prisma/index");
const { getAll } = require("./patientController");

module.exports = {
  getRoom: async (req, res) => {
    try {
      const status = req.query.status ? parseInt(req.query.status) : undefined;

      const rooms = await db.bed.findMany({
        where: { ...(status !== undefined && { status }) },
        select: {
          room: true,
        },
        distinct: ["room"],
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
};
