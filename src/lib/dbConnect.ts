import mongoose, { Mongoose } from "mongoose";
type ConnectionObject ={
    isConnected?:number
}
const connection :ConnectionObject={}
async function dbConnect():Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to database")
        return
    }
try {
    const db= await mongoose.connect("mongodb+srv://ankurdeep08102004:ankur123456789@testing.ztgon.mongodb.net")
    connection.isConnected =db.connections[0].readyState
    console.log("DB connected successfully")
} catch (error) {
    console.log("connection failed",error)
    process.exit(1)
}
}
export default dbConnect;