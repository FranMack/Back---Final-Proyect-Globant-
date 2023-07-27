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
    } catch (error) {
      res.status(500).json({ error: "Failed to create office in controller." });
    }
  }
  static async selectDesk(req, res) {
    try {
      const { officeId, deskNumber } = req.body;

      const message = await OfficeService.selectDesk(officeId, deskNumber);

      return res.status(200).json({ message });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OfficeController;
