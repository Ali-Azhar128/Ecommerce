import express from 'express'
import { 
        loginUser,
        logoutUser,
        registerUser, 
        getUserProfile, 
        updateUserProfile, 
        getUsers, 
        deleteUser, 
        getUserById, 
        updateUser 
} from "../controllers/userController.js"
import { protect, admin } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/logout', logoutUser)
router.post('/login', loginUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

export default router