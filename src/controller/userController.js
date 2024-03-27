const db = require("../database/prisma/index");

module.exports = {
  index: async (req, res) => {
    try {
      const users = await db.user.findMany();
      res.json(
        {
          data: users,
        },
        200
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
