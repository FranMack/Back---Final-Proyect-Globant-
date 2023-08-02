const officeModel = require("../models/office.model");
const reportModel = require("../models/report.model");
const userModel = require("../models/user.model");

class UserAdminServices {
  static async listUsers() {
    try {
      const allUsers = await userModel.find();
      return allUsers;
    } catch (error) {
      throw new Error("Failed to fetch all users from the service.");
    }
  }

  static async searchUsers(searchValue) {
    try {
      const regex = new RegExp(searchValue, "i");
      const users = await userModel.find({
        $or: [
          { email: regex },
          { first_name: regex },
          { last_name: regex },
          { username: regex },
        ],
      });

      return users;
    } catch (error) {
      console.error("Report not found:", error);
      throw new Error("Failed to get report in service");
    }
  }

  static async filterUsersByLocation(searchValue) {
    try {
      const regex = new RegExp(searchValue, "i");
      const users = await userModel.find({
        location: regex,
      });

      return users;
    } catch (error) {
      console.error("Report not found:", error);
      throw new Error("Failed to get report in service");
    }
  }
  static async getUserReports(user) {
    try {
      const allReports = await reportModel.find({
        user: user,
      });

      return allReports;
    } catch (error) {
      throw new Error("Failet to fetch all reports from the service");
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

      if (selectedDesk.isOccupied) {
        selectedDesk.isOccupied = false;
      } else {
        selectedDesk.isOccupied = true;
      }

      await office.save();

      return "Escritorio seleccionado actualizado correctamente";
    } catch (error) {
      throw new Error("Error al actualizar el escritorio seleccionado");
    }
  }
}

module.exports = UserAdminServices;
