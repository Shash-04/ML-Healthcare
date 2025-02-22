import mongoose ,{Schema,Document} from 'mongoose'
export interface Report extends Document{
  heartRate:number;
    bloodPressure:number;
    bloodSugar:number;
    createdAt:Date
}
const reportSchema :Schema<Report> = new Schema({
    heartRate:{
        type:Number,
        required:true
    },
    bloodPressure:{
        type:Number,
        required:true
    },
    bloodSugar:{
        type:Number,
        required:true
    },

    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})
export interface User extends Document{
    username:string;
    password:string;
    email:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isverified:boolean;
    report:Report[]
}
const userSchema :Schema<User> = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    verifyCode:{
        type:String,
        required:true
    },
    isverified:{
        type:Boolean,
        required:true
    },
   
   
    verifyCodeExpiry:{
        type:Date,
        required:true,
        
    },
    
    report:[reportSchema]

})
const UserModel =(mongoose.models.User as mongoose.Model<User>)|| mongoose.model<User>("User",userSchema)
export default UserModel;