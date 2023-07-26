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
  static async selectDesk(officeId, deskNumber) {
    try {
      const office = await officeModel.findById(officeId);

      const selectedDesk = office.desks.find(
        (desk) => desk.deskNumber === deskNumber
      );

      if (!selectedDesk) {
        throw new Error("Escritorio no encontrado");
      }

      selectedDesk.isOccupied = true;

      await office.save();

      return "Escritorio seleccionado actualizado correctamente";
    } catch (error) {
      throw new Error("Error al actualizar el escritorio seleccionado");
    }
  }
}

module.exports = OfficeService;
