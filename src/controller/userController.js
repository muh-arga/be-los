const db = require("../database/prisma/index");
const joi = require("joi");
const bcrypt = require("bcryptjs");
const { insert } = require("./patientController");

module.exports = {
  getById: async (req, res) => {
    try {
      const user = await db.user.findUnique({
        where: { id: req.params.id },
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
          nip: true,
          phone: true,
          gender: true,
          status: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      res.json(
        {
          data: user,
        },
        200
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  index: async (req, res) => {
    try {
      const status = req.query.status ? parseInt(req.query.status) : undefined;

      const users = await db.user.findMany({
        where: { ...(status !== undefined && { status }) },
      });
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

  delete: async (req, res) => {
    try {
      const user = await db.user.delete({
        where: { id: req.params.id },
      });
      res.json(
        {
          message: "User deleted successfully",
        },
        200
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const validate = (data) => {
        const schema = joi.object({
          name: joi.string().required(),
          nip: joi.string().required(),
          gender: joi.string().required(),
          address: joi.string().required(),
          phone: joi.date().required(),
          role: joi.string().required(),
          password: joi.string().optional(),
          confirmPassword: joi.ref("password"),
        });
        return schema.validate(data);
      };

      const { error, value } = validate(req.body);

      if (error) {
        let message = error.details[0].message.split('"');
        message = message[1] + message[2];
        return res.status(400).json({ message });
      }

      if (req.body.password) {
        const password = await bcrypt.hash(req.body.password, 10);

        req.body = {
          name: req.body.name,
          nip: req.body.nip,
          gender: req.body.gender,
          address: req.body.address,
          phone: req.body.phone,
          role: req.body.role,
          password: password,
        };
      }

      const user = await db.user.update({
        where: { id: req.params.id },
        data: req.body,
      });
      res.json(
        {
          message: "User updated successfully",
          data: user,
        },
        200
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  approve: async (req, res) => {
    try {
      const user = await db.user.update({
        where: { id: req.params.id },
        data: {
          status: 1,
        },
      });
      res.json(
        {
          message: "User approved successfully",
          data: user,
        },
        200
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
