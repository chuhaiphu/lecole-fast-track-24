
import userService from '../service/userService.js';
import { responseData } from '../util/response.js';

class UserController {
  async registerUser(req, res) {
    try {
      const { username, roles, secret_phrase } = req.body;

      if (!username || !roles || !secret_phrase) {
        return responseData(400, "Error", "Username, roles, and secret phrase are required", null, res);
      }

      await userService.createUser(username, roles, secret_phrase);
      responseData(201, "Success", "User created successfully", null, res);
    } catch (error) {
      console.error(error);
      responseData(500, "Error", error.message, null, res);
    }
  }

  async getUserByUsername(req, res) {
    try {
      const { username } = req.params;
      const user = await userService.getUserByUsername(username);
      responseData(200, "Success", "User retrieved successfully", user, res);
    } catch (error) {
      console.error(error);
      responseData(500, "Error", "Failed to retrieve user", null, res);
    }
  }

  async loginUser(req, res) {
    try {
      const { username, secret_phrase } = req.body;

      if (!username || !secret_phrase) {
        return responseData(400, "Error", "Username and secret phrase are required", null, res);
      }

      const user = await userService.loginUser(username, secret_phrase);

      if (!user) {
        return responseData(401, "Error", "Invalid credentials", null, res);
      }

      responseData(200, "Success", "Login successful", user, res);
    } catch (error) {
      console.error(error);
      responseData(500, "Error", "Login failed", null, res);
    }
  }


  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      responseData(200, "Success", "Users retrieved successfully", users, res);
    } catch (error) {
      console.error(error);
      responseData(500, "Error", "Failed to retrieve users", null, res);
    }
  }

}

export default new UserController();
