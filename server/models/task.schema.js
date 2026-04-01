import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    
    status:{
        type:String,
        required:true
    }
},{timestamps:true})

const Task = mongoose.model("task",taskSchema)

export default Task;