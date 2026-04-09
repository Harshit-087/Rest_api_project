import Task from "../models/task.schema.js"


export const fetchMyTasks= async(req,res)=>{ 
    const {userId} = req.params
    console.log("user  id in fetching my task",userId)
    try{
        const fetchMytasks = await Task.find({userId}).sort({createdAt:-1})
        console.log("fetch mu assests",fetchMytasks)
        return res.status(200).json({message:"successfully fetched my tasks",data:fetchMytasks})
    }catch(error){
         console.log("error in fetching my task ",error)
        return res.status(500).json({message:"internal server error",error:error.message})
    }
}

export const CreateTask = async(req,res)=>{
    const {title,description,status,userId} = req.body
    try{
        const createdTask = await Task.create({
            title,description,status,userId
        })
        return res.status(201).json({message:"task created successfuly",data:createdTask})
    }catch(error){
        console.log("error in creating  task",error)
        return res.status(500).json({message:"internal server error"})
    }
}

export const DeleteTask = async(req,res)=>{
    const {id} = req.params
    try{
        const deleteTask = await Task.findByIdAndDelete(id)
        return res.status(200).json({message:"successfully deleted the task"})
    }catch(error){
        console.log("error in deleting  the task",error)
        return res.status(500).json({message:"internal server error",error:error.message})
    }
} 

export const fetchAllTasks= async(req,res)=>{
    try{
        const fetchAllTask = await Task.find().sort({createdAt:-1})
        return res.status(200).json({message:"successfully fetched all the task ",data:fetchAllTask})
    }catch(error){
        console.log("error in fetching all the task ",error)
        return res.status(500).json({message:"internal server error",error:error.message})
    }
}

export const UpdateTask = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      message: "updated the task",
      updatedTask
    });

  } catch (error) {
    console.log("error in updating the task", error);

    return res.status(500).json({
      message: "internal server error",
      error: error.message
    });
  }
};

