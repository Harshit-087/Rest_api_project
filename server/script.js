import express from "express"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import cors from "cors"
import connectionDb from "./db/connection.js"
import userRouter from "./routers/user.router.js"
import taskRouter from "./routers/task.router.js"
import dotenv from "dotenv"
dotenv.config()

const app = express();

app.use(express.json());
console.log("FRONTEND_URL =", process.env.FRONTEND_URL);
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET", "POST", "DELETE", "PUT", "OPTIONS"],
   allowedHeaders: ["Content-Type"],
   credentials:true
}));

connectionDb()
app.get("/", (req,res)=>{
  res.send("server alive")
})

app.use("/user-api/v1",userRouter)

app.use("/task-api/v1",taskRouter)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(5400,()=>{
    console.log("server started")
})