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

    static async searchUsers(req,res){

      const searchValue = req.query.searchValue;
      try{

        const users=await UserAdminServices.searchUsers(searchValue)
        res.json(users);

      }

      catch (error) {
        res.status(500).json({ error: "Failed to fetch all users." });
      }
    }


    static async filterUsersByLocation(req,res){

      const searchValue = req.query.searchValue;
      try{

        const users=await UserAdminServices.filterUsersByLocation(searchValue)
        res.json(users);

      }

      catch (error) {
        res.status(500).json({ error: "Failed to fetch all users." });
      }
    }
}

module.exports = UserAdmincontroller;