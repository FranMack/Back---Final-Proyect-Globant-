const UserAdminServices = require("../services/userAdmin.services");

class UserAdmincontroller {
    static async listUsers(req,res) {
        try{
          const userList = await UserAdminServices.listUsers();
          res.status(200).json(userList)
        }
        catch (error) {
            res.status(500).json({ error: "Failed to fetch all users." });
          }
    }
}

module.exports = UserAdmincontroller;