import express from 'express'
import {registerUser,authUser} from "../Controllers/userControllers.js"
const router = express.Router();

 router.route('/').post(registerUser);
 router.route('/login').post(authUser)

export default router