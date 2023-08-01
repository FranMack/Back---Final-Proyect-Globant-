const userModel = require("../models/user.model");

class UserAdminServices {
    static async listUsers(){
        try{
            const allUsers = await userModel.find()
            return allUsers;
        }
        catch (error){
            throw new Error("Failed to fetch all users from the service.");
        }
    }
}

module.exports = UserAdminServices;