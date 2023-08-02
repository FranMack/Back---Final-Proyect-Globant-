const officeModel = require("../models/office.model");

class OfficeService {
  static async getAllOffices() {
    try {
      const allOffices = await officeModel.find();
      return allOffices;
    } catch (error) {
      throw new Error("Failed to fetch all offices from the service.");
    }
  }

  async createOffice(officeData) {
    try {
      const newOffice = new officeModel(officeData);
      const createdOffice = await newOffice.save();
      return createdOffice;
    } catch (error) {
      throw new Error("Failed to create office in service.");
    }
  }
}

module.exports = OfficeService;
