import express from "express"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import connectionDb from "./db/connection.js"
import userRouter from "./routers/user.router.js"
import taskRouter from "./routers/task.router.js"
import dotenv from "dotenv"
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5400;

// Behind reverse proxies (Render/Railway/Nginx), this helps Express respect HTTPS info.
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = (process.env.FRONTEND_URL || process.env.BACKEND_URL)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
    // Exact origin matching is required for credential cookies in browsers.
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods:["GET", "POST", "DELETE", "PUT", "OPTIONS"],
   allowedHeaders: ["Content-Type","Authorization"],
   credentials:true
}));

connectionDb()
app.get("/", (req,res)=>{
  res.send("server alive")
})

app.use("/user-api/v1",userRouter)

app.use("/task-api/v1",taskRouter)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT,()=>{
    console.log("server started")
})