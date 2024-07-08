import { timeStamp } from "console";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }

    },
    {
        timestamps: true
    }
)

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)//bcrypt.compare compares the hashed password with the enteredpassword(plain text)
}

//userSchema.pre is called before an activity we pass i.e. in below case before we save anything to our database
//User.create can only trigger save middleware User.insert of User.insertMany can not trigger 

/* Arrow functions do not bind their own this value. Instead, this is determined by the surrounding (lexical) context. In Mongoose middleware, this refers to the document being saved, so you need to use a regular function that binds its own this value. */
userSchema.pre('save', async function(next){
    //This if statement checks if password field is modified i.e. if admin is only saving a user etc then move to next middleware 
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)


})

const User = mongoose.model('User', userSchema)

export default User