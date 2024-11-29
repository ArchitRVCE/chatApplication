import express from 'express'
import {protect} from "../Middleware/authMiddleware.js"
import { fetchChats,accessChat,createGroupChat,renameGroup,removeFromGroup,addToGroup } from '../Controllers/chatControllers.js';
const router = express.Router();

router.route('/').get(protect,fetchChats)
router.route('/').post(protect,accessChat)
router.route('/group').post(protect,createGroupChat)
router.route('/rename').put(protect,renameGroup)
router.route('/groupRemove').delete(protect,removeFromGroup)
router.route('/groupAdd').put(protect,addToGroup)


export default router