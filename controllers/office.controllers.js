const OfficeService = require("../services/office.services");

class OfficeController {
  static async getAllOffices(req, res) {
    try {
      const allOffices = await OfficeService.getAllOffices();
      res.status(200).json(allOffices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch all offices." });
    }
  }

  static async createOffice(req, res) {
    try {
      const officeData = req.body;
      const officeService = new OfficeService();
      const createdOffice = await officeService.createOffice(officeData);
      res.status(201).json(createdOffice);
      console.log(createdOffice);
    } catch (error) {
      res.status(500).json({ error: "Failed to create office in controller." });
    }
  }
}

module.exports = OfficeController;
