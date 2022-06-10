
import {
    addNewUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
    login,
    logout
} from "../controllers/userController.js";
import { authenticateJWT } from "../middleware/auth.js";

export const userroutes = (app) => {
    app.route('/user', authenticateJWT)
        // Get all users
        .get(getUsers, authenticateJWT)
        // Create new user
        .post(addNewUser);

    app.route('/user/:userID')
        // Update user
        .put(updateUser)
        // Get user by ID
        .get(getUserById)
        // Delete user
        .delete(deleteUser)

    app.route('/login')
        // Login
        .post(login)

    app.route('/logout')
        // Login
        .post(logout)
}
