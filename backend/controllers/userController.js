import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id)


    res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', {
        expires: new Date(0),
        httpOnly: true,
    })

    res.status(200).json({
        message: 'Logged out successfully'
    })
})

const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body

    const exists = await User.findOne({ email })

    if(exists){
        res.status(400)
        throw new Error('User already exists!')
    }else{
        const user = await User.create({
            name, 
            email, 
            password

        });

        generateToken(res, user._id)

        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password
            })
        }
    }
})

const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if(user){
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    console.log('first')

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        console.log(req.body.name, 'name')

        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    
    }
})

const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})  

const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        if(user.isAdmin){
            res.status(400);
            throw new Error('Cannot delete admin user')
        }

        await User.deleteOne({ _id: user._id })
        res.status(200).json({ message: 'User deleted successfully' })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.status(200).json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)
        console.log(user.name, 'name')

        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,


        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

export { 
        loginUser,
        logoutUser,
        registerUser, 
        getUserProfile, 
        updateUserProfile, 
        getUsers, 
        deleteUser, 
        getUserById, 
        updateUser 
    }