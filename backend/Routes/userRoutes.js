import express from 'express'
import {registerUser,authUser,allUsers} from "../Controllers/userControllers.js"
import {protect} from "../Middleware/authMiddleware.js"
const router = express.Router();

 router.route('/').post(registerUser).get(protect,allUsers);
 router.route('/login').post(authUser)

export default router