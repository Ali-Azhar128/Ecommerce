import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'


dotenv.config()
connectDB()

const importData = async () => {
   try{
    await User.deleteMany()
   await Product.deleteMany()
   await Order.deleteMany()

   const createdUsers = await User.insertMany(users)
   const admin = createdUsers[0]._id

   const sampleProducts = products.map((product) => {
    return { ...product, user: admin }
   })
   

   await Product.insertMany(sampleProducts)

   
   

   console.log('Data imported'.green.inverse)
   process.exit()
   }
   catch (e){
    console.log(`Error Message: ${e.message}`.red.bold.underline)
    process.exit(1)
    
   }

   

};

const destroyData = async () => {
   try{
    await User.deleteMany()
   await Product.deleteMany()
   await Order.deleteMany()

   console.log('Data destroyed'.red.inverse)
   process.exit()
   }
   catch (e){
    console.log(`Error Message: ${e.message}`.red.inverse)
    process.exit(1)
    
   }

   

}

if(process.argv[2] === '-d'){
    destroyData()
}
else{
    importData()
}
