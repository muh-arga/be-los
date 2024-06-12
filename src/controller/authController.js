const joi = require("joi");
const db = require("../database/prisma/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
  login: async (req, res) => {
    const validate = (data) => {
      const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
      });
      return schema.validate(data);
    };
    try {
      const { error, value } = validate(req.body);
      if (error) {
        let message = error.details[0].message.split('"');
        message = message[1] + message[2];
        return res.status(400).json({ message });
      }

      const user = await db.user.findUnique({
        where: { email: req.body.email },
      });

      if (user) {
        if (user.status === 0) {
          return res.status(403).json({
            message:
              "Akun anda belum aktif. Harap hubungi admin untuk mengaktifkan akun!",
          });
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
          const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
          };

          const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "120m",
            }
          );
          return res.status(200).json({ accessToken, role: user.role });
        } else {
          return res.status(401).json({ message: "Invalid email or password" });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAuthUser: async (req, res) => {
    const user = await db.user.findFirst({
      where: { email: req.user.email },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({ data: user });
    }
  },

  register: async (req, res) => {
    try {
      const validate = (data) => {
        const schema = joi.object({
          name: joi.string().required(),
          email: joi.string().email().required(),
          password: joi.string().required(),
          nip: joi.string().required(),
          phone: joi.string().required(),
          address: joi.string().required(),
          gender: joi.string().required(),
        });
        return schema.validate(data);
      };

      const { error, value } = validate(req.body);

      if (error) {
        let message = error.details[0].message.split('"');
        message = message[1] + message[2];
        return res.status(400).json({ message });
      }

      const existingUser = await db.user.findFirst({
        where: { email: req.body.email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Email Telah Terdaftar!" });
      }

      const password = await bcrypt.hash(req.body.password, 10);

      const user = await db.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: password,
          nip: req.body.nip,
          phone: req.body.phone,
          address: req.body.address,
          gender: req.body.gender,
        },
      });

      res.json(
        {
          message: "User created successfully",
          data: user,
        },
        201
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
