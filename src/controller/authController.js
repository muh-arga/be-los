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
        if (await bcrypt.compare(req.body.password, user.password)) {
          const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
          };
          const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET
          );
          return res.status(200).json({ accessToken });
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
};
