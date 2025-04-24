const { models } = require("../models");

class TestController {
  async createTest(req, res) {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }
      const test = await models.Test.create({ text });
      res.status(201).json({ message: "Test created successfully", test });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllTests(req, res) {
    try {
      const tests = await models.Test.findAll({ order: [["createdAt", "DESC"]] });
      res.status(200).json({ tests });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new TestController();
